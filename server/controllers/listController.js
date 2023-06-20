const Card = require('../models/card');
const Comment = require('../models/comment');
const List = require('../models/list');
const Board = require('../models/board');
const User = require("../models/user");
const { createActivity, updateBoardActivityLog } = require('../utils/createActivity');
const File = require('../models/file');

const getAllLists = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId).populate('lists');
    if (!board) {
      return res.status(404).send();
    }
    res.send(board.lists);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createList = async (req, res) => {
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
};

const moveListToBoard = async (req, res) => {
  try {
    const { listId, fromBoardId } = req.params;
    const { toBoardId } = req.body;
    const fromBoard = await Board.findById(fromBoardId);
    const toBoard = await Board.findById(toBoardId);
    fromBoard.lists.splice(fromBoard.lists.indexOf(listId), 1);
    toBoard.lists.push(listId);
    await fromBoard.save();
    await toBoard.save();
    const fromActivity = await createActivity('List', listId, `moved to Board ${toBoard.boardName}`, req.user._id);
    const toActivity = await createActivity('List', listId, `moved from Board ${fromBoard.boardName}`, req.user._id);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateList = async (req, res) => {
  try {
    const { listId } = req.params;
    const { listTitle } = req.body;

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).send();
    }

    list.listTitle = listTitle;
    await list.save();

    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Define a function that takes a list id as an argument
const deleteList = async (req, res) => {
  const { listId } = req.params;
  try {
    // Find the list by id and populate its cards, comments and files
    const list = await List.findById(listId).populate({
      path: 'cards',
      populate: [{
        path: 'comments'
      }, {
        path: 'files'
      }]
    });
    // If the list does not exist, throw an error
    if (!list) {
      res.json({ msg: 'List not found' });
    }
    // Loop through the cards and delete their comments, files and themselves
    for (const card of list.cards) {
      for (const comment of card.comments) {
        await Comment.findByIdAndDelete(comment._id);
      }
      for (const file of card.files) {
        await File.findByIdAndDelete(file._id);
      }
      await Card.findByIdAndDelete(card._id);
    }
    // Delete the list
    await List.findByIdAndDelete(listId);
    const board = await Board.findOneAndUpdate({ lists: listId }, { $pull: { lists: listId } });
    // If the board does not exist, throw an error
    if (!board) {
      throw new Error('Board not found');
    }
    // Return a success message
    res.json({listId:list._id, msg: `Delete ${list.listTitle} success!`});
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.json({ msg: "Delete failed!" });
  }
};




module.exports = {
  getAllLists,
  createList,
  moveListToBoard,
  updateList,
  deleteList
};