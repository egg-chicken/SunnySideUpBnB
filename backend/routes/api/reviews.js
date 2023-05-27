const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

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
          },
          {
            model: Image,
            as: 'ReviewImages',
            attributes: ['id', 'url']
           }
        ],
      });
    res.json({Reviews: reviews})
})



module.exports = router;