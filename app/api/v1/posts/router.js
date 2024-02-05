const express = require('express');
const { findAll } = require('./controller');
const router = express();

router.get('/posts', findAll);

module.exports = router;
