const express = require('express');
const { findAll, createOne, getUser } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const router = express();

const upload = require('../../../middlewares/multer');

router.get('/messages', authenticateUser, getUser);
router.get('/messages/:receiverId', authenticateUser, findAll);
router.post('/message', upload.single('file'), authenticateUser, createOne);

module.exports = router;
