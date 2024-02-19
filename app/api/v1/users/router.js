const express = require('express');
const {
  deleteAccount,
  findOne,
  updateInstagram,
  updateLocation,
} = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const router = express();

router.delete('/user', authenticateUser, deleteAccount);
router.get('/users/:id', findOne);
router.put('/user/instagram', authenticateUser, updateInstagram);
router.put('/user/location', authenticateUser, updateLocation);

module.exports = router;
