const express = require('express');
const { findAll, findOne } = require('./controller');
const router = express();

router.get('/projects', findAll);
router.get('/projects/:id', findOne);

module.exports = router;
