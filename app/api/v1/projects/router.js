const express = require('express');
const { findAll, findOne, getSuggestions } = require('./controller');
const router = express();

router.get('/projects', findAll);
router.get('/projects/:id', findOne);

module.exports = router;
