const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize, Sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { check } = require('express-validator');

const validateQueryParams = [
  check('page')
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage('Page must be an integer between 0 and 10'),
  check('size')
    .optional()
    .isInt({ min: 0, max: 20 })
    .withMessage('Page must be an integer between 0 and 10'),
  check('maxLat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Maximum latitude is invalid'),
  check('minLat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Minimum latitude is invalid'),
  check('minLng')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Minimum longitude is invalid'),
  check('maxLng')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Maximum longitude is invalid'),
  check('minPrice')
    .optional()
    .isFloat({ min: 0})
    .withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice')
    .optional()
    .isFloat({ min: 0})
    .withMessage('Maximum price must be greater than or equal to 0'),
];

const validateSpot = [
  check('address')
    .exists({checkFalsy: true})
    .withMessage('Street address is required'),
  check('city')
    .exists({checkFalsy: true})
    .withMessage('City is required'),
  check('state')
    .exists({checkFalsy: true})
    .withMessage('State is required'),
  check('country')
    .exists({checkFalsy: true})
    .withMessage('Country is required'),
  check('lat')
    .exists({checkFalsy: true})
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({checkFalsy: true})
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({checkFalsy: true})
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({checkFalsy: true})
    .withMessage('Description is required'),
  check('price')
    .exists({checkFalsy: true})
    .withMessage('Price per day is required')
]

const validateReview = [
  check('review')
    .exists({checkFalsy: true})
    .withMessage('Review text is required'),
  check('stars')
    .exists({checkFalsy: true})
    .withMessage('Stars must be an integer from 1 to 5'),
]

//get all spots
router.get('/', validateQueryParams, async (req, res) => {
  let { page, size, minLng, maxLng, minPrice, maxPrice } = req.query;
  const options = { };

  page = parseInt(page);
  size = parseInt(size);

  if(page > 10) page = 10;
  if(size > 10) size = 20;

  if(Number.isNaN(page) || page < 0 || !page) page = 0;
  if(Number.isNaN(size) || size <= 0) size = 20;

  options.limit = size;
  options.offset = size * page;

  const spots = await Spot.findAll({
    attributes: {
      include: [
        [Sequelize.cast(Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), 'FLOAT'),"avgRating"],
        [sequelize.col('SpotImages.url'), 'previewImage']
      ]
    },
    include: [
      {
        model: Review,
        attributes: []
      },
      {
        model: Image,
        attributes: [],
        as: 'SpotImages'
      }
    ],

    group: ['Spot.id', 'SpotImages.url'],

  });

  res.json({
    Spots: spots,
    page: parseInt(page),
    size: parseInt(size)
  })

});

//get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
    const currentUserId = req.user.id;

    const spots = await Spot.findAll({
        where: { ownerId: currentUserId },
        attributes: {
            include: [
              [Sequelize.cast(Sequelize.fn("AVG", Sequelize.col('Reviews.stars')), 'FLOAT'),"avgRating"],
              [sequelize.col('SpotImages.url'), 'previewImage']
            ]
          },
          include: [
            {
              model: Image,
              attributes: [],
              as: 'SpotImages'
            },
            {
              model: Review,
              attributes: []
            },
          ],
          group: ['Spot.id', 'SpotImages.url']
    });

    res.json({Spots: spots});
});

//get details of a spot from an id
router.get('/:id', async (req, res) => {
    const id = +req.params.id;
    const detailId = await Spot.findByPk(id, {
        include: [
            {
                model: Image,
                as: 'SpotImages',
                attributes: ['id', 'url', 'preview'],
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            },
        ],
        group: ['Spot.id', 'SpotImages.id', 'Owner.id']
    });

    if (!detailId) {
      res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviewsInfo = await Review.findAll({
      where: { spotId: detailId.id},
      attributes: [
        [Sequelize.cast(Sequelize.fn("COUNT", Sequelize.col("Review.spotId")), 'INTEGER'),"numReviews"],
        [Sequelize.cast(Sequelize.fn("AVG", Sequelize.col("Review.stars")), 'FLOAT'),"avgStarRating"]
      ]
    })

    const detailIdInfo = detailId.toJSON();
    const numReviewsInfo = reviewsInfo[0].toJSON();

    detailIdInfo.numReviews = numReviewsInfo.numReviews;
    detailIdInfo.avgStarRating = numReviewsInfo.avgStarRating

    res.json(detailIdInfo);
});

//create a spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;

    const spot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    res.status(201).json(spot)
});

//add an image to a spot based on the Spot's id
router.post('/:id/images', requireAuth, async (req, res) => {
    const spotId = req.params.id;
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if(req.user.id !== spot.ownerId){
      return res.status(403).json({message: "Forbidden"});
    }

    const image = await Image.create({
      url,
      preview,
      imageableId: spotId,
      imeageableType: 'Spot'
    });

    return res.json({
      id: image.id,
      url: image.url,
      preview: image.preview
    });

});

//edit a spot
router.put('/:id', requireAuth, validateSpot, async (req, res) => {
    const spotId = req.params.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findOne({
        where: { id: spotId}
      });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if(spot.ownerId !== req.user.id){
      return res.status(403).json({message: "Forbidden"});
    }

    await spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });

    res.status(200).json(spot);
});

//delete a spot
router.delete('/:id', requireAuth, async (req, res) => {
      const spotId = req.params.id;

      const spot = await Spot.findOne({
        where: { id: spotId}
      });

      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
      if(spot.ownerId !== req.user.id){
        return res.status(403).json({message: "Forbidden"});
      }

      await spot.destroy();

      res.status(200).json({ message: 'Successfully deleted' });

    });


//get all reviews by a spot's id
router.get('/:id/reviews', async (req, res) => {
    const spotId = req.params.id
    const spot = await Spot.findByPk(req.params.id);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAll({
        where: { spotId },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: Image,
            as: 'ReviewImages',
            attributes: ['id', 'url']
          }
        ]
      });

      res.json({ Reviews: reviews });
});

//create a review for a spot based on the spot's id
router.post('/:id/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body;
    const userId = req.user.id;
    const spotId = +req.params.id;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
          return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const existingReview = await Review.findOne({
      where: { userId, spotId}
    });

    if(existingReview) {
      const err = new Error('Review already exists for this spot');
      err.status = 403;
      return next(err);
    }

    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars
    });

    res.status(201).json(newReview);
});

//get all bookings for a spot based on the spots id
router.get('/:id/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(req.params.id);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    let bookingsAll;
    if(req.user.id === spot.ownerId){
        bookingsAll = await spot.getBookings({
        include: {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
        });
    } else {
        bookingsAll = await spot.getBookings({
          attributes: ['spotId', 'startDate', 'endDate']
        });
    }

    res.json({Bookings: bookingsAll});

});


//create a booking from a Spot based on the spots id
//spot does not belong to the current user
router.post('/:id/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.id;
    let { startDate, endDate } = req.body;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if(req.user.id === spot.ownerId){
      return res.status(403).json({message: "Forbidden"});
    }

    if(endDate <= startDate) {
        return res.status(400).json({
            message: "Bad request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        });
    }
    const bookingId = await Booking.findAll({ where: {spotId}});

    for(let i = 0; i < bookingId.length; i ++){
      let reservedSpot = bookingId[i];

      if(startDate <= reservedSpot.endDate && startDate >= reservedSpot.startDate){
        return res.status(400).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
              startDate: "Start date conflicts with an existing booking",
              endDate: "End date conflicts with an existing booking"
          }
      });

      }
      if(endDate >= reservedSpot.endDate && startDate <= reservedSpot.startDate){
        return res.status(400).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
              startDate: "Start date conflicts with an existing booking",
              endDate: "End date conflicts with an existing booking"
          }
      });
      }
    }

    const booking = await Booking.create({
      spotId,
      userId,
      startDate,
      endDate
    });

    res.status(200).json(booking);
});


module.exports = router;
