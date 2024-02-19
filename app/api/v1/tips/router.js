const express = require('express');
const { findAll, findOne, getRandom } = require('./controller');
const router = express();

router.get('/tips', findAll);
router.get('/tip/random', getRandom);
router.get('/tips/:id', findOne);

module.exports = router;
