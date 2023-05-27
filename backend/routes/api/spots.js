const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//get all spots
router.get('/', async (req, res) => {
      const spots = await Spot.findAll({
        attributes: {
          include: [
            [
              sequelize.fn('AVG', sequelize.col('Reviews.stars')),
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
                sequelize.fn('AVG', sequelize.col('Reviews.stars')),
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
    res.json({Spots: spots});
});

//get details of a spot from an id - idk whats wrong
router.get('/:id', async (req, res) => {

    const id = req.params.id;
    const detailId = await Spot.findByPk(id, {
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("Reviews.review")),"numReviews"
                ],
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),"avgStarRating"
                ]
            ],
        },
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
            {
                model: Review,
                attributes: []
            }
        ],
        group: ['Spot.id', 'SpotImages.id', 'Owner.id']
    });

    if (!detailId) {
        res.status(404).json({ message: "Spot couldn't be found" });
      } else {
        res.json(detailId);
      }

});

//create a spot - idk tbh
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
router.patch('/:id/images', requireAuth, async (req, res) => {

});

//edit a spot


//delete a spot





module.exports = router;
