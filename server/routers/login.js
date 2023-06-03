const express = require('express');
const loginRouter = express.Router();
const { auth } = require('../middlewares/auth');
const { loginUser, logoutUser } = require('../controllers/authController');

// Login route
loginRouter.post('/login', loginUser);

// Logout route
loginRouter.post('/logout', auth, logoutUser);

module.exports = loginRouter;