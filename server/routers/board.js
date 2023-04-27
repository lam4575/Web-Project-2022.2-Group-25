// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const Board = require('../models/board');
const Activity = require('../models/activity');
const User = require('../models/user')
const {auth} = require('../middlewares/auth');

// Create a new board
router.post('/', auth, async (req, res) => {
  try {
    // Create a new Board object in the database
    const board = new Board({
      ...req.body,
      adminMembers:[req.user._id],
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


// Share a board with another user by username
router.post('/:id/share', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).send();
    }
    if (board.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).send({error: 'User is not the owner of the board'});
    }
    const userToShareWith = await User.findOne({username: req.body.username});
    if (!userToShareWith) {
      return res.status(404).send({error: 'User not found'});
    }
    if (board.members.includes(userToShareWith._id)) {
      return res.status(400).send({error: 'User already a member of the board'});
    }
    board.members.push(userToShareWith._id);
    if (req.body.isAdmin) {
      board.adminMembers.push(userToShareWith._id);
    }
    await board.save();

    // Create a new Activity object in the database
    const activity = new Activity({
      action: 'shared',
      entity: 'Board',
      entityId: board._id,
      createdBy: req.user._id,
      createdAt: new Date()
    });
    await activity.save();

    // Push the reference to the newly created Activity object into the activityLog array of the user who shared the board
    const user = req.user;
    user.activityLog.push(activity._id);
    await user.save();

    // Add the board to the userToShareWith's boards
    userToShareWith.boards.push(board._id);
    await userToShareWith.save();

    res.send(board);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Leave board route
router.post('/:id/leave', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).send();
    }
  if (board.createdBy.toString() === req.user._id.toString()) {
      // If the user is the owner of the board
      board.closed = true;
      await board.save();
  } else {
      // If the user is not the owner of the board, remove the user from the members array and remove any card that the user is assigned to
      const adminIndex = board.adminMembers.indexOf(req.user._id);
      const memberIndex = board.members.indexOf(req.user._id);
      if (memberIndex > -1) {
        board.members.splice(memberIndex, 1);
        if ( adminIndex > -1) board.adminMembers.splice(adminIndex, 1);
        await board.save();
        // const cards = await Card.find({ board: board._id, $in:[assignedTo]});
        // if (cards.length > 0) {
        //     for (let i = 0; i < cards.length; i++) {
        //     const card = cards[i];
        //     const assignedToIndex = card.assignedTo.indexOf(req.user._id);
        //     if (assignedToIndex > -1) {
        //       card.assignedTo.splice(assignedToIndex, 1);
        //       await card.save();
        //     }
        //   }
        // }
      }
      const user = req.user;
      const index = user.boards.indexOf(req.params.id);
      if(index > -1) {
        user.boards.splice(index,1);
        await user.save();
      }
  }
    res.send(board);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Update board.closed to true
router.patch('/:id/open', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).send();
    }
    if (board.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).send({error: 'User is not the owner of the board'});
    }
    board.closed = false;
    await board.save();

    // Create a new Activity object in the database
    const activity = new Activity({
      action: 'open',
      entity: 'Board',
      entityId: board._id,
      createdBy: req.user._id,
      createdAt: new Date()
    });
    await activity.save();

    // Push the reference to the newly created Activity object into the activityLog array of the user who closed the board
    const user = req.user;
    user.activityLog.push(activity._id);
    await user.save();

    res.send(board);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Export the router
module.exports = router;
