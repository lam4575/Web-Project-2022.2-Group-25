const express = require('express');
const router = express.Router();

// Import login controller
const loginController = require('../controllers/loginController');

// Login route
router.post('/', loginController.login);

module.exports = router;
