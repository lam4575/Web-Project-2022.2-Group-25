const Card = require('../models/card');
const Comment = require('../models/comment');
const List = require('../models/list');
const Board = require('../models/board');
const User = require("../models/user");
const { createActivity, updateBoardActivityLog } = require('../utils/createActivity');

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

module.exports = {
  getAllLists,
  createList,
  moveListToBoard
};