const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//get all of the current user's bookings - idk not complete
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

//edit a booking
router.put('/:id', requireAuth, async (req, res) => {
    const bookingId = req.params.id;
    const { startDate, endDate } = req.body;
    // const currentUserId = req.user.id;

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    // if (booking.userId !== currentUserId) {
    //   return res.status(403).json({ message: "You are not authorized to modify this booking" });
    // }

    const currentDate = new Date();
    if (booking.endDate < currentDate) {
      return res.status(403).json({ message: "Past bookings can't be modified" });
    }

    // const existingBooking = await Booking.findOne({
    //   where: {
    //     spotId: booking.spotId,
    //     [Op.or]: [
    //       {
    //         startDate: {
    //           [Op.lte]: endDate
    //         }
    //       },
    //       {
    //         endDate: {
    //           [Op.gte]: startDate
    //         }
    //       }
    //     ],
    //     id: {
    //       [Op.not]: bookingId
    //     }
    //   }
    // });

    // if (existingBooking) {
    //   return res.status(403).json({
    //     message: "Sorry, this spot is already booked for the specified dates",
    //     errors: {
    //       startDate: "Start date conflicts with an existing booking",
    //       endDate: "End date conflicts with an existing booking"
    //     }
    //   });
    // }

    booking.startDate = startDate;
    booking.endDate = endDate;
    await booking.save();

    res.status(200).json(booking);
});

//delete a booking
router.delete('/:id', requireAuth, async (req, res) => {
    const bookingId = req.params.id;

    const booking = await Booking.findOne({
        where: { id: bookingId }
    });

    const currentDate = new Date();
    if (booking.startDate <= currentDate) {
      return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    }
    
    if (!booking) {
        return res.status(404).json({ message: "Booking couldnt be found" });
      }

      await booking.destroy();

      res.status(200).json({ message: 'Successfully deleted' });
});


module.exports = router;
