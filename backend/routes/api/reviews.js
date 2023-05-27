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

//add an image to a review based on the reviews id
router.post('/:id/images', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { url } = req.body;
    const userId = req.user.id;

    const review = await Review.findOne({
        where: { id: id, userId}
    });

    if(!review){
        return res.status(404).json({message: "Review couldn't be found"})
    }

    const imageCount = await Image.count({
        where: { id }
    });

    if(imageCount >= 10){
        return res.status(403).json({ message: "Maximum number of images for this resource was reached"})
    }

    const newImage = await Image.create({
        id,
        url
    });

    res.json(newImage);

});

module.exports = router;
