const express = require('express');
const { findAll, findOne } = require('./controller');
const { unAuthenticateUser } = require('../../../middlewares/auth');
const router = express();

router.get('/projects', findAll);
router.get('/projects/:id', unAuthenticateUser, findOne);

module.exports = router;
