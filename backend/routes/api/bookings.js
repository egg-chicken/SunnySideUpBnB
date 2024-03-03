const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot, Image, Booking, User, Review, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { check } = require('express-validator')

const validateBooking = [
  check('endDate')
    .exists( {checkFalsy: true})
    .custom((value, { req }) => {
      if(new Date(value) <= new Date(req.body.startDate)) {
        throw new Error ('endDate cannot be on or before startDate')
      }
      return true
    }),
]

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
router.put('/:id', requireAuth, validateBooking, async (req, res) => {
    const bookingId = req.params.id;
    let { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const currentDate = new Date();
    const date = currentDate.toISOString().slice(0, 10);
    if (date > booking.endDate) {
      return res.status(403).json({ message: "Past bookings can't be modified"});
    }

    if (endDate < startDate){
      return res.status(403).json({ message: "endDate cannot be on or before startDate"});
    }

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
