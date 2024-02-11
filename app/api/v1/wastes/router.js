const express = require('express');
const {
  getAll,
  createOne,
  deleteOne,
  getSuggestions,
} = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const router = express();

router.post('/waste', authenticateUser, createOne);
router.get('/wastes', authenticateUser, getAll);
router.delete('/wastes/:id', authenticateUser, deleteOne);
router.post('/wastes/project-suggestions', getSuggestions);

module.exports = router;
