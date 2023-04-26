// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const Board = require('../models/board');
const Activity = require('../models/activity')
const {auth} = require('../middlewares/auth');

// Create a new board
router.post('/', auth, async (req, res) => {
  try {
    // Create a new Board object in the database
    const board = new Board({
      ...req.body,
      members:[req.user._id],
      createdBy: req.user._id
    });
    await board.save();

    // Create a new Activity object in the database
    const activity = new Activity({
      action: 'added',
      entity: 'Board',
      entityId: board._id,
      createdBy: req.user._id,
      createdAt: new Date()
    });
    await activity.save();

    // Push the reference to the newly created Activity object into the activityLog array of the user who created the board
    const user = req.user;
    user.activityLog.push(activity._id);
    await user.save();

    // Send a successful response to the frontend client
    res.status(201).send(board);
  } catch (error) {
    res.status(400).send(error);
  }
});




// Get all boards
router.get('/', async (req, res) => {
  try {
    const boards = await Board.find({});
    res.send(boards);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a board by ID
router.get('/:id', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).send();
    }
    res.send(board);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a board by ID
router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).send();
    }
    updates.forEach((update) => (board[update] = req.body[update]));
    await board.save();
    res.send(board);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a board by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) {
      return res.status(404).send();
    }
    res.send(board);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Export the router
module.exports = router;
