const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');

// Route for creating or updating board
router.post('/board', async (req, res) => {
  try {
    const { action, type } = req.body;
    const newActivity = new Activity({ action, type });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route for creating or updating list
router.post('/list', async (req, res) => {
  try {
    const { action, type } = req.body;
    const newActivity = new Activity({ action, type });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route for creating or updating card
router.post('/card', async (req, res) => {
  try {
    const { action, type } = req.body;
    const newActivity = new Activity({ action, type });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
