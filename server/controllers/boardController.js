const Board = require('../models/board');
const Activity = require('../models/activity');
const User = require('../models/user');
const List = require('../models/list');
const { createActivity, updateBoardActivityLog } = require('../utils/createActivity');
const Card = require('../models/card');

const shareBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).send();
    }
    const userToShareWith = await User.findOne({username: req.body.username});
    if (board.createdBy.toString() === userToShareWith._id.toString()) { // check if user is the owner of the board
      return res.status(401).send({error: 'User is the owner of the board and cannot share with themselves'});
    }
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

    const activity = await createActivity('User', userToShareWith._id, 'shared', req.user._id);
    await updateBoardActivityLog(board._id, activity);

    // Add the board to the userToShareWith's boards
    userToShareWith.boards.push(board._id);
    await userToShareWith.save();

    res.send(board);
  } catch (error) {
    res.status(500).send(error);
  }
};

const leaveBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate({
      path: 'lists',
      populate: {
        path: 'cards'
      }
    });
    if (!board) {
      return res.status(404).send();
    }
    if (board.createdBy.toString() === req.user._id.toString() && boards.adminMembers.length == 1) {
      // If the user is the owner of the board
      board.closed = true;
      await board.save();
      
      const activity = await createActivity('User', req.user._id, 'closed', req.user._id);
      await updateBoardActivityLog(board._id, activity);

    } else {
      // If the user is not the owner of the board, remove the user from the members array and remove any card that the user is assigned to
      const adminIndex = board.adminMembers.indexOf(req.user._id);
      const memberIndex = board.members.indexOf(req.user._id);
      if (memberIndex > -1) {
        board.members.splice(memberIndex, 1);
        if ( adminIndex > -1) board.adminMembers.splice(adminIndex, 1);
        await board.save();
        
        board.lists.forEach(list => {
          list.cards.forEach(async card => {
            if(card.assignTo.includes(req.user._id)) {
              card.assignTo.splice(card.assignTo.indexOf(req.user._id), 1);
              await card.save();
            }
          });
        });

        const activity = await createActivity('User', req.user._id, 'left', req.user._id);
        await updateBoardActivityLog(board._id, activity);
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
};

const openBoard = async (req, res) => {
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

    const activity = await createActivity('Board', board._id, 'opened', req.user._id);
    await updateBoardActivityLog(board._id, activity);

    res.send(board);
  } catch (error) {
    res.status(500).send(error);
  }
};



const createBoard = async (req, res) => {
  try {
    const board = new Board({
      ...req.body,
      adminMembers: [req.user._id],
      members: [req.user._id],
      createdBy: req.user._id
    });
    await board.save();

    req.user.boards.push(board);
    await req.user.save();

    const activity = await createActivity('Board', board._id, 'created', req.user._id);
    await updateBoardActivityLog(board._id, activity);

    res.status(201).send(board);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllBoards = async (req, res) => {
  try {
    const user = req.user._id.toString();
    const boards = await Board.find({});
    const userBoards = boards.filter(board => board.members.includes(user));
    console.log(userBoards)
    res.send(userBoards);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate("lists").populate("activityLog").populate({
      path: 'lists',
      populate: {
        path: 'cards',
        model: 'Card',
      },
    });
    if (!board) {
      return res.status(404).send();
    }
    res.send(board);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateBoardById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['boardName', 'description', 'visibility'];
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

    const activity = await createActivity('Board', board._id, 'updated', req.user._id);
    await updateBoardActivityLog(board._id, activity);

    res.send(board);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteBoardById = async (req, res) => {
  // Add the logic for deleting a board by ID
};

module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoardById,
  deleteBoardById,
  shareBoard,
  leaveBoard,
  openBoard
};