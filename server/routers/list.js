const express = require('express');
const Card = require('../models/card');
const Comment = require('../models/comment');
const List = require('../models/list');
const Board = require('../models/board');
const User = require("../models/user")
const {auth} = require('../middlewares/auth');
const {createActivity, updateBoardActivityLog} = require('../utils/createActivity')

const router = express.Router();

// Get all lists of a board by board ID
router.get('/boards/:boardId/lists', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId).populate('lists');
    if (!board) {
      return res.status(404).send();
    }
    res.send(board.lists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new list for a board by board ID
router.post('/boards/:boardId/create-list', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).send();
    }
    const newList = new List({
      listTitle: req.body.listTitle,
      cards: []
    });
    board.lists.push(newList);
    await board.save();
    await newList.save();
    const activity = await createActivity('List', newList._id, 'created', req.user._id);
    await updateBoardActivityLog(board._id, activity);

    res.status(201).send(newList);
  } catch (error) {
    res.status(500).send(error);
  }
});



// Route for moving a list from one board to another
router.put('/boards/:fromBoardId/lists/:listId/move-to-board', auth ,async (req, res) => {
  try {
    const { listId, fromBoardId } = req.params;
    const { toBoardId } = req.body;
    const fromBoard = await Board.findById(fromBoardId);
    const toBoard = await Board.findById(toBoardId);
    fromBoard.lists.splice(fromBoard.lists.indexOf(listId),1);
    toBoard.lists.push(listId);
    await fromBoard.save();
    await toBoard.save();
    const fromActivity = await createActivity('List', listId, `moved to Board ${toBoard.boardName}` , req.user._id);
    const toActivity = await createActivity('List', listId, `moved from Board ${fromBoard.boardName}` , req.user._id);
    await updateBoardActivityLog(fromBoard._id, fromActivity);
    await updateBoardActivityLog(toBoard._id, toActivity);
    res.status(200).json(fromBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route for updating the title of a list
router.put('boards/:boardId/lists/:listId', auth ,async (req, res) => {
  try {
    const { listId } = req.params;
    const { title } = req.body;
    const list = await List.findById(listId);
    list.listTitle = title;
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


/////////////////////////////////////////////////////////////////////////////////////////////CARD


// Create a new card for a list by list ID
router.post('/boards/:boardId/lists/:listId/create-card', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) {
      return res.status(404).send();
    }
    const newCard = new Card({
      cardTitle: req.body.cardTitle,
      description: req.body.description,
      createdBy:req.user._id
    });
    list.cards.push(newCard);
    await list.save();
    await newCard.save();
    const activity = await createActivity('Card', newCard._id, `created in List ${list.listTitle}` , req.user._id);
    await updateBoardActivityLog(req.params.boardId, activity);

    res.status(201).send(newCard);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new comment for a card by card ID
router.post('/boards/:boardId/lists/:listId/cards/:cardId/add-comment', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).send();
    }
    const newComment = new Comment({
      text: req.body.text,
      createdBy: req.user._id
    });
    card.comments.push(newComment);
    await card.save();
    await newComment.save();
    const activity = await createActivity('Comment', newComment._id, `added in ${card.cardTitle}`, req.user._id);
    await updateBoardActivityLog(req.params.boardId, activity);

    res.status(201).send(newComment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for updating the text of a comment by comment ID if the user is the creator of the comment
router.put('/boards/:boardId/lists/:listId/cards/:cardId/comments/:commentId', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).send();
    }
    const user = req.user;
    if (comment.createdBy.equals(user._id)) {
      comment.text = req.body.text;
      await comment.save();
      const activity = await createActivity('Comment', comment._id, `updated in ${req.params.cardId}`, req.user._id);
      await updateBoardActivityLog(req.params.boardId, activity);
      res.status(200).send(comment);
    } else {
      res.status(401).send({ message: 'Not authorized to update comment' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for deleting a comment by comment ID if the user is an admin
router.delete('/boards/:boardId/lists/:listId/cards/:cardId/comments/:commentId', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).send();
    }
    const board = await Board.findById(req.params.boardId);
    const user = req.user;
    if (board.adminMembers.includes(user._id)) {
      await comment.remove();
      const activity = await createActivity('Comment', comment._id, `deleted from ${req.params.cardId}`, req.user._id);
      await updateBoardActivityLog(req.params.boardId, activity);
      res.status(200).send({ message: 'Comment deleted successfully' });
    } else {
      res.status(401).send({ message: 'Not authorized to delete comment' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a route for assigning multiple users to a card by card ID
router.put('/boards/:boardId/lists/:listId/cards/:cardId/assign-users', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).send();
    }
    const { usernames } = req.body;
    const userIds = [];
    for (let i = 0; i < usernames.length; i++) {
      const user = await User.findOne({ username: usernames[i] });
      if (user) {
        userIds.push(user._id);
      }
    }
    card.assignTo = userIds;
    await card.save();
    const activity = await createActivity('Card', card._id, `assigned to ${userIds.length} users`, req.user._id);
    await updateBoardActivityLog(req.params.boardId, activity);

    res.status(200).send(card);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for updating a card by card ID
router.put('/boards/:boardId/lists/:listId/cards/:cardId', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).send();
    }
    const board = await Board.findById(req.params.boardId);
    const user = req.user;
    if (board.createdBy.equals(user._id) || board.adminMembers.includes(user._id)) {
      card.cardTitle = req.body.cardTitle;
      card.description = req.body.description;
      await card.save();
      const activity = await createActivity('Card', card._id, `updated in List ${req.params.listId}`, req.user._id);
      await updateBoardActivityLog(req.params.boardId, activity);
      res.status(200).send(card);
    } else {
      res.status(401).send({ message: 'Not authorized to update card' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;
