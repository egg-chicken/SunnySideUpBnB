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

        group: ['Spot.id']

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

          group: ['Spot.id']

    });
    res.json({Spots: spots});

});

//get details of a spot from an id - not complete
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
                attributes: ['id', 'url'],
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
        ]

    });

    if(!detailId) {
        res.status(404)
        res.json({message: "Spot couldn't be found"})
    }

    res.json(detailId);
})

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
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId: req.user.id
      });

      res.json(spot)
})

module.exports = router;
