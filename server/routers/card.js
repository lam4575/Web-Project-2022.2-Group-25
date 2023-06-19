const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { createCard, updateCard, deleteCard, getCardComments,addComment, getCard, addWatching, joinCard } = require('../controllers/cardController');

// Create route for creating a new card
router.post('/boards/:boardId/lists/:listId/create-card', auth, createCard);
// Create route for adding a comment to a card
router.post('/cards/:cardId/add-comment', auth, addComment);

// Create route for updating a card
router.patch('/cards/:cardId/update-card', auth, updateCard);

// Create route for deleting a card
router.delete('/lists/:listId/cards/:cardId/delete-card', auth, deleteCard);

router.get('/cards/:cardId', auth, getCard);

router.post('/cards/:cardId/add-watching', auth, addWatching);

router.post('/cards/:cardId/join-card/:userId', joinCard);

// Create route for fetching card comments
router.get('/cards/:cardId/get-comments', auth, getCardComments);

module.exports = router;