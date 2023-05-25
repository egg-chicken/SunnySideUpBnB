const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    res.json(spots);
})

//get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
    const currentUserId = req.user.id;

    const spots = await Spot.findAll({ where: { ownerId: currentUserId } });
    res.json(spots);

})

module.exports = router;
