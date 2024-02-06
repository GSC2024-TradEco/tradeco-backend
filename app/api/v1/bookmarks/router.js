const express = require('express');
const { findAll, createBookmark, deleteBookmark } = require('./controller');
const router = express();

router.get('/bookmarks/projects', findAll);
router.post('/bookmarks/project', createBookmark);
router.delete('/bookmarks/projects/:id', deleteBookmark);

module.exports = router;
