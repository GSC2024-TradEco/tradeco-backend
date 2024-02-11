const express = require('express');
const { updateInstagram, updateLocation } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const router = express();

router.put('/user/instagram', updateInstagram);
router.put('/user/location', updateLocation);

module.exports = router;
