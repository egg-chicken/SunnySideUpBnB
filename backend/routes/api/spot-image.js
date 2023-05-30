const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//delete a spot image
router.delete('/:id', requireAuth, async (req, res) => {
    //const userId = +req.user.id;
    //const spotId = +req.params.spotId;
    //const imageId = +req.params.imageableId;

    const image = await Image.findByPk(req.params.id);

    if(!image) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
    }


    if(req.user.id !== image.ownerId){
        return res.status(403).json({ message: "Forbidden" });
    }

    await image.destroy();

    res.status(200).json({ message: 'Successfully deleted' });
});

module.exports = router;
