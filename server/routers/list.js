const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { getAllLists, createList, moveListToBoard, updateList, deleteList } = require('../controllers/listController');

// Get all lists of a board by board ID
router.get('/boards/:boardId/lists', auth, getAllLists);

// Create a new list for a board by board ID
router.post('/boards/:boardId/create-list', auth, createList);

// Route for moving a list from one board to another
router.put('/boards/:fromBoardId/lists/:listId/move-to-board', auth, moveListToBoard);

router.patch('/lists/:listId/update-list', auth, updateList);

router.delete('/lists/:listId/delete-list', auth, deleteList);



module.exports = router;