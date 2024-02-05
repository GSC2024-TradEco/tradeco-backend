const express = require('express');
const { shareWastes, getSuggestions } = require('./controller');
const router = express();

router.post('/wastes/share', shareWastes);
router.post('/wastes/project-suggestions', getSuggestions);

module.exports = router;
