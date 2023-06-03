const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { getAllLists, createList, moveListToBoard } = require('../controllers/listController');

// Get all lists of a board by board ID
router.get('/boards/:boardId/lists', auth, getAllLists);

// Create a new list for a board by board ID
router.post('/boards/:boardId/create-list', auth, createList);

// Route for moving a list from one board to another
router.put('/boards/:fromBoardId/lists/:listId/move-to-board', auth, moveListToBoard);

module.exports = router;