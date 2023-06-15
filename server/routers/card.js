const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { createCard, updateCard, deleteCard, getCardComments,addComment } = require('../controllers/cardController');

// Create route for creating a new card
router.post('/boards/:boardId/lists/:listId/create-card', auth, createCard);
// Create route for adding a comment to a card
router.post('/cards/:cardId/add-comment', auth, addComment);

// Create route for updating a card
router.patch('/cards/:cardId/update-card', auth, updateCard);

// Create route for deleting a card
router.delete('/cards/:cardId/delete-card', auth, deleteCard);

// Create route for fetching card comments
router.get('/cards/:cardId/get-comments', auth, getCardComments);

module.exports = router;