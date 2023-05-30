const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize, Sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

//get all spots
router.get('/', async (req, res) => {
      const spots = await Spot.findAll({
        attributes: {
          include: [
            [
              sequelize.fn('AVG', sequelize.cast(sequelize.col('Reviews.stars'), 'FLOAT')),
              'avgRating'
            ],
            [
                sequelize.col('SpotImages.url'), 'previewImage'
            ]
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

        group: ['Spot.id', 'SpotImages.url']

      });

    res.json({Spots: spots})

});

//get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
    const currentUserId = req.user.id;

    const spots = await Spot.findAll({
        where: { ownerId: currentUserId },
        attributes: {
            include: [
              [
                sequelize.fn('AVG', sequelize.cast(sequelize.col('Reviews.stars'), 'FLOAT')),
                'avgRating'
              ],
              [
                  sequelize.col('SpotImages.url'), 'previewImage'
              ]
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
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        res.status(400);
        res.json({
            message: 'Bad Request',
            errors: {
              address: 'Street address is required',
              city: 'City is required',
              state: 'State is required',
              country: 'Country is required',
              lat: 'Latitude is not valid',
              lng: 'Longitude is not valid',
              name: 'Name must be less than 50 characters',
              description: 'Description is required',
              price: 'Price per day is required'
            }
        });
    }

    const spot = await Spot.create({
        ownerId: req.user.id,
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

      res.json(spot)
});

//add an image to a spot based on the Spot's id
router.post('/:id/images', requireAuth, async (req, res) => {
    const spotId = req.params.id;
    const { url, preview } = req.body;

    const spot = await Spot.findOne({
        where: { id: spotId },
        include: [
          {
            model: Image,
            as: 'SpotImages',
            //attributes: ['id', 'url', 'preview']
          }
        ]

      });

      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
      const image = await Image.create({
        url,
        preview
      });

      return res.json({
        id: spotId,
        url: image.url,
        preview: image.preview
      });

     // res.json(image);
});

//edit a spot
router.put('/:id', requireAuth, async (req, res) => {
    const spotId = req.params.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findOne({
        where: { id: spotId}
      });

        if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
            res.status(400);
            res.json({
                message: 'Bad Request',
                errors: {
                address: 'Street address is required',
                city: 'City is required',
                state: 'State is required',
                country: 'Country is required',
                lat: 'Latitude is not valid',
                lng: 'Longitude is not valid',
                name: 'Name must be less than 50 characters',
                description: 'Description is required',
                price: 'Price per day is required'
                }
            });
        }

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
        where: { id: spotId} //, ownerId: req.user.id
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

//add query filters to get all spots
// router.get('/spots?:query', async (req, res) => {

// })

//get all reviews by a spot's id
router.get('/:id/reviews', async (req, res) => {
    const spotId = req.params.id
    const spot = await Spot.findByPk(req.params.id);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAll({
        where: {
          spotId
        },
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
router.post('/:id/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const userId = req.user.id;
    const spotId = +req.params.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
          return res.status(404).json({ message: "Spot couldn't be found" });
        }

    if (!review || !stars) {
        res.status(400);
        res.json({
            message: 'Bad Request',
            errors: {
            review: 'Review text is required',
            stars: 'Stars must be an integer from 1 to 5'
            }
        });
    }

    const existingReview = await Review.findOne({
      where: { userId, spotId}
    });

    if (existingReview) {
      return res.status(500).json({ message: 'User already has a review for this spot' });
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

    // const bookings = await Booking.findAll({
    //   where: { id },
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['id', 'firstName', 'lastName']
    //     },
    //   ]
    //})
    res.json({Bookings: allBookings});

});


//create a booking from a Spot based on thr spots id - not complete
//spot must Not belong to the current user . . .
router.post('/:id/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.id;
    let { startDate, endDate } = req.body;
    const userId = req.user.id;
    //startDate = new Date(startDate);
    //endDate = new Date(endDate);

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
    // const existingBooking = await Booking.findOne({
    //   where: {
    //     spotId,
    //     [Op.or]: [
    //       {
    //         startDate: {
    //           [Op.lte]: endDate
    //         }
    //       },
    //       {
    //         endDate: {
    //           [Op.gte]: startDate
    //         }
    //       }
    //     ]
    //   }
    // });

    // if (existingBooking) {
    //   return res.status(403).json({
    //     message: "Sorry, this spot is already booked for the specified dates",
    //     errors: {
    //       startDate: "Start date conflicts with an existing booking",
    //       endDate: "End date conflicts with an existing booking"
    //     }
    //   });
    // }

    const booking = await Booking.create({
      spotId,
      userId,
      startDate,
      endDate
    });

    res.status(200).json(booking);
});


module.exports = router;
