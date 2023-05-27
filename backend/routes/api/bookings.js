const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//get all of the current user's bookings - idk
router.get('/current', requireAuth, async (req, res) => {
    const currentUserId = req.user;

    const bookings = await Booking.findAll({
        where: {
            userId: currentUserId.id
          },
        include: {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', ],
        //     include: {
        //     model: SpotImages,
        //     attributes: ['url'],
        //   },
        }
    });

    res.json({Bookings: bookings});
});





module.exports = router;
