const express = require('express');
const { findAll, createOne } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const router = express();

router.get('/posts', findAll);
router.post('/post', authenticateUser, createOne);

module.exports = router;
