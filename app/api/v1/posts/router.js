const express = require('express');
const { findAll, createOne } = require('./controller');
const router = express();

router.get('/posts', findAll);
router.post('/post', createOne);

module.exports = router;
