const express = require('express');
const {
  getAll,
  createOne,
  deleteOne,
  getSuggestions,
} = require('./controller');
const router = express();

router.post('/waste', createOne);
router.get('/wastes', getAll);
router.delete('/wastes/:id', deleteOne);
router.post('/wastes/project-suggestions', getSuggestions);

module.exports = router;
