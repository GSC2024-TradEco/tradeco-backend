const express = require('express');
const { createOne, getSuggestions } = require('./controller');
const router = express();

router.post('/wastes', createOne);
router.post('/wastes/project-suggestions', getSuggestions);

module.exports = router;
