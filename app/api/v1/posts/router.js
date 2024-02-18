const express = require('express');
const { findAll, createOne } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const router = express();

const upload = require('../../../middlewares/multer');

router.get('/posts', findAll);
router.post('/post', upload, authenticateUser, createOne);

module.exports = router;
