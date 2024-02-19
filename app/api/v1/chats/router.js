const express = require('express');
const { findAll, createOne, findChat } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const router = express();

router.post('/chat', authenticateUser, createOne);
router.get('/chats', authenticateUser, findAll);
router.get('/chat/:currentUserId/:userId', authenticateUser, findChat);

module.exports = router;
