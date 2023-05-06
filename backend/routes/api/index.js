const router = require('express').Router();

//api/test
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });




module.exports = router;
