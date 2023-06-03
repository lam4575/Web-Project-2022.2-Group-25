const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
  createUser,
  getAuthenticatedUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// CREATE
router.post('/users', createUser);

// AUTHENTICATE
router.get('/users/me', auth, getAuthenticatedUser);

// READ
router.get('/users', getUsers);

// UPDATE
router.patch('/users/:id', updateUser);

// DELETE
router.delete('/users/:id', deleteUser);

module.exports = router;