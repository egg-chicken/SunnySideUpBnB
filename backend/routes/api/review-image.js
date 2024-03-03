const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//delete a review image
router.delete('/:id', requireAuth, async (req, res) => {
    const userId = +req.user.id;
    const { id } = req.params;
    const image = await Image.findByPk(id);

    if(!image) {
        return res.status(404).json({ message: "Review Image couldn't be found" });
    }

    const imageType = image.imageableType;

    if(imageType === "Review"){
        const review = await image.getReview();

        if(userId !== review.userId){
            return res.status(403).json({ message: "Forbidden" });
        }
    }

    await image.destroy();
    res.status(200).json({ message: 'Successfully deleted' });
});

module.exports = router;
