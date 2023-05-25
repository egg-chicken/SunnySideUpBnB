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



module.exports = router;
