const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { createCard, updateCard, deleteCard } = require('../controllers/cardController');

// Create route for creating a new card
router.post('/boards/:boardId/lists/:listId/create-card', auth, createCard);

// Create route for updating a card
router.put('/cards/:cardId/update-card', auth, updateCard);

// Create route for deleting a card
router.delete('/cards/:cardId/delete-card', auth, deleteCard);

module.exports = router;