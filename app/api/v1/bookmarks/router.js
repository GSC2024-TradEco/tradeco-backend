const express = require('express');
const { findAll, createBookmark, deleteBookmark } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const router = express();

router.get('/bookmarks/projects', authenticateUser, findAll);
router.post('/bookmarks/project', authenticateUser, createBookmark);
router.delete('/bookmarks/projects/:id', authenticateUser, deleteBookmark);

module.exports = router;
