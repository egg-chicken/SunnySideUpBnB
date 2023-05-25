const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    res.json({Spots: spots});
})

//get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
    const currentUserId = req.user.id;

    const spots = await Spot.findAll({ where: { ownerId: currentUserId } });
    res.json({Spots: spots});

})

//get details of a spot from an id - not complete
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const detailId = await Spot.findByPk(id);

    if(!detailId) {
        res.status(404)
        res.json({message: "Spot couldn't be found"})
    }

    res.json(detailId);
})

module.exports = router;
