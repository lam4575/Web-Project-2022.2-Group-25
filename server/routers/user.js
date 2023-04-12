const express = require('express');
const User = require('../models/user');
const router = express.Router();


// CREATE
router.post('/users', async (req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email});
    try {
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  });
  
  // READ
  router.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // UPDATE
  router.patch('/users/:id', async (req, res) => {
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
  });
  
  // DELETE
  router.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  module.exports = router;
