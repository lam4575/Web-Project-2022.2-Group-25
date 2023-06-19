const Board = require('../models/board');
const User = require('../models/user');

const createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    token: []
  });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const getAuthenticatedUser = async (req, res) => {
  try {
    const user = await User.findOne({ tokens: { $in: [req.token] } }).populate("boards");
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const { _id, username, firstName, lastName, avatar, email, boards } = user;
    res.send({username, firstName, lastName, avatar, email, boards });
  } catch (error) {
    res.status(500).send(error);
  }
};


const getUsers = async (req, res) => {
  try {
    const { username, email, boardId } = req.query;
    const usernamePattern = new RegExp(`^${username}`, 'i');
    const emailPattern = new RegExp(`^${email}`, 'i');

    // Find the board with the specified boardId
    const board = await Board.findById(boardId);
    // Construct the MongoDB query to search for usernames and emails
    // and exclude users that are members of the specified board
    const query = {
      $and: [
        {
          $or: [
            { username: { $regex: usernamePattern } },
            { email: { $regex: emailPattern } }
          ]
        },
        {
          _id: { $nin: board.members }
        }
      ]
    };
    const users = await User.find(query);
    if(users.length === 0) {
      return res.json({msg:"User not found!"});
    }
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};


const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'password', 'email'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send(req.params);
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};


module.exports = {
  createUser,
  getAuthenticatedUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById
};