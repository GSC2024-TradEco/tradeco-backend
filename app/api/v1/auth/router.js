const express = require('express');
const { register } = require('./controller');
const router = express();

router.post('/auth/register', register);

module.exports = router;
