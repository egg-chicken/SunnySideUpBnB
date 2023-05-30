const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//delete a review image
router.delete('/id', requireAuth, async (req, res) => {

    const image = await Image.findByPk(req.params.id);

    if(!image) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    const spotImage = image.imageableType;

    if(spotImage === "Spot"){
        const spot = await image.getSpot();

        if(req.user.id !== spot.ownerId){
            return res.status(403).json({ message: "Forbidden" });
            }
    }

    // if(req.user.id !== image.ownerId){
    //     return res.status(403).json({ message: "Forbidden" });
    // }

    await image.destroy();

    res.status(200).json({ message: 'Successfully deleted' });

});

module.exports = router;
