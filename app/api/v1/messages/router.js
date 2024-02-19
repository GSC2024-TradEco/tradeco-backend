const express = require('express');
const { findAll, createOne } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const router = express();

router.get('/messages', authenticateUser, findAll);
router.post('/message', authenticateUser, createOne);

module.exports = router;
