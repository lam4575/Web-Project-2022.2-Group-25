const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoardById,
  deleteBoardById,
  shareBoard, 
  leaveBoard, 
  openBoard
} = require('../controllers/boardController');

// Share a board with another user by username
router.post('/:id/share', auth, shareBoard);

// Leave board route
router.post('/:id/leave', auth, leaveBoard);

// Update board.closed to true
router.patch('/:id/open', auth, openBoard);

module.exports = router;

// Create a new board
router.post('/', auth, createBoard);

// Get all boards
router.get('/', getAllBoards);

// Get a board by ID
router.get('/:id', getBoardById);

// Update a board by ID
router.patch('/:id', auth, updateBoardById);

// Delete a board by ID
router.delete('/:id', auth, deleteBoardById);

module.exports = router;