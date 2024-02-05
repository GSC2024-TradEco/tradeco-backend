const express = require('express');
const { getSuggestions } = require('./controller');
const router = express();

router.post('/wastes/project-suggestions', getSuggestions);

module.exports = router;
