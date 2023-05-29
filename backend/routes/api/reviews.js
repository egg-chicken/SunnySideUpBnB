const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//get all reviews of the current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const reviews = await Review.findAll({
        where: {
          userId
        },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: Spot,
            attributes: {
              exclude: ['description', 'createdAt', 'updatedAt'],
            },
            include: [
              {
                model: Image,
                as: 'SpotImages',
                attributes: [],
                where: { preview: true}
              }
            ]
          },
          {
            model: Image,
            as: 'ReviewImages',
            attributes: ['id', 'url']
           }
        ],
      });

    for(let i = 0; i < reviews.length; i ++){
      const review = reviews[i];
      const spotId = review.Spot.id;
      const showPreviewImage = await Image.findOne({
        where: {
          imageableId: spotId,
          imageableType: 'Spot',
          preview: true
        },
        attributes: ['url'],
      });

      if(showPreviewImage){
        reviews[i].Spot.dataValues.previewImage = showPreviewImage.url;
      } else {
        reviews[i].Spot.dataValues.showPreviewImage = null;
      }
    }

    res.json({Reviews: reviews})
});

//add an image to a review based on the reviews id - not complete
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

//edit a review
router.put('/:id', requireAuth, async (req, res) => {
    const reviewId = req.params.id;
    const { review, stars } = req.body;

    const existingReview = await Review.findOne({
        where: { id: reviewId }
      });

      if(!review || !stars) {
        res.status(400);
        res.json({
            message: 'Bad Request',
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5",
            }
        });
      }

      if (!existingReview) {
        return res.status(404).json({ message: "Review couldn't be found" });
      }

      existingReview.review = review;
      existingReview.stars = stars;

      await existingReview.save();

      res.json(existingReview);
});

//delete a review -- idk
router.delete('/:id', requireAuth, async (req, res) => {
    const reviewId = req.params.id;

    const review = await Review.findOne({
        where: { id: reviewId }
      });

    if (!review) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if(review.ownerId !== req.user.id){
        return res.status(403).json({message: "Forbidden"});
    }

    await review.destroy();

    res.status(200).json({ message: 'Successfully deleted' });
});






module.exports = router;
