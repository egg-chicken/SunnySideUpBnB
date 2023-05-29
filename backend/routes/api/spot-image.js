const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//delete a spot image
router.delete('/:id', requireAuth, async (req, res) => {
    const userId = +req.user.id;
    const spotId = +req.params.spotId;
    const imageId = +req.params.imageableId;

    //const spot = await Spot.findOne({ where: { id: spotId, ownerId: userId } });

    // if (!spot) {
    //     return res.status(404).json({ message: "Spot Image couldn't be found" });
    //   }

    const spotImage = await Image.findOne({
        where: { id: imageId, spotId}
    });

    if(!spotImage) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
    }


    await spotImage.destroy();

    res.status(200).json({ message: 'Successfully deleted' });
});

module.exports = router;
