const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

//get all of the current user's bookings - idk not complete
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const bookings = await Booking.findAll({
        where: {
          userId
          },
        include: {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            include: {
              model: Image,
              as: 'SpotImages',
              where: { preview: true},
              attributes: []
            }
        },
    });

    for (let i = 0; i < bookings.length; i ++) {
      const booking = bookings[i];

      if(booking.Spot){
        const bookingId = booking.Spot.id;
        const bookPreviewImage = await Image.findOne({
          where: {
            imageableId: bookingId,
            imageableType: 'Spot',
            preview: true
          },
          attributes: ['url']
        });

        if(bookPreviewImage){
          bookings[i].Spot.dataValues.previewImage = bookPreviewImage.url;
        } else {
          bookings[i].Spot.dataValues.bookPreviewImage = null;
        }
      }
    }

    res.json({Bookings: bookings});
});

//edit a booking
router.put('/:id', requireAuth, async (req, res) => {
    const bookingId = req.params.id;
    let { startDate, endDate } = req.body;
    // const currentUserId = req.user.id;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    //startDate = new Date(startDate);
    //endDate = new Date(endDate);

    const currentDate = new Date();
    if (currentDate > booking.endDate) { //new Date(booking.endDate).getTime() < currentDate.getTime()
      return res.status(403).json({ message: "Past bookings can't be modified"});
    }

    if (endDate <= startDate){
      return res.status(400).json({ message: "endDate cannot be on or before startDate"});
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
    const bookingsSpot = await Booking.findAll({
      where: { spotId: booking.spotId, id: { [Op.not]: bookingId}}
    });

    for(let i = 0; i < bookingsSpot.length; i ++){
      let current = bookingsSpot[i];
      if(startDate <= current.endDate && startDate >= current.startDate){
          return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
            startDate: "Start date conflicts with an existing booking",
            }
          })
        }
      if(endDate >= current.endDate && startDate <= current.startDate){
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
          endDate: "End date conflicts with an existing booking",
          }
          })
      }

      }

    if(startDate) booking.startDate = startDate;
    if(endDate) booking.endDate = endDate;

    await booking.save();

    res.status(200).json(booking);
});

//delete a booking
router.delete('/:id', requireAuth, async (req, res) => {
    const bookingId = req.params.id;

    // const booking = await Booking.findOne({
    //     where: { bookingId }
    // });
    const booking = await Booking.findByPk(bookingId, {
      include: {
        model: Spot,
        attributes: ['ownerId'],
      }
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking couldnt be found" });
    }


    if(req.user.id !== booking.userId && req.user.id !== booking.Spot.ownerId){
      return res.status(403).json({ message: "Forbidden" });
    }

    const currentDate = new Date();
    if (booking.startDate <= currentDate) {
      return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    }

    await booking.destroy();

    res.status(200).json({ message: 'Successfully deleted' });
});


module.exports = router;
