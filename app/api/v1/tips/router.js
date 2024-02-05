const express = require('express');
const { findAll, findOne } = require('./controller');
const router = express();

router.get('/tips', findAll);
router.get('/tips/:id', findOne);

module.exports = router;
