const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//get all reviews of the current user - not complete
router.get('/current', requireAuth, async (req, res) => {
    const currentUser = req.user;
    const reviews = await Review.findAll({
        where: {
          userId: currentUser.id
        },
        attributes: {
            include: [
                 [
                    sequelize.col('SpotImages.url'), 'previewImage'
                ]
            ]
        },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: Spot,
            exclude: ['createdAt', 'updatedAt'],
            as: 'SpotImages'
          },
          {
            model: Image,
            as: 'ReviewImages',
            attributes: ['id', 'url']
           }
        ],
      });
    res.json({Reviews: reviews})
});

//get all reviews by a spot's id
router.get('/:id/reviews', async (req, res) => {
    const { id } = req.params;

    const spot = await Spot.findByPk(id);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAll({
        where: {
          id
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

module.exports = router;
