const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { createCard } = require('../controllers/cardController');

// Create route for creating a new card
router.post('/boards/:boardId/lists/:listId/create-card', auth, createCard);

module.exports = router;