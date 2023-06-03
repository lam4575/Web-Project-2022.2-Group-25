const Activity = require('../models/activity');

const createOrUpdateBoard = async (req, res) => {
  try {
    const { action, type } = req.body;
    const newActivity = new Activity({ action, type });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createOrUpdateList = async (req, res) => {
  try {
    const { action, type } = req.body;
    const newActivity = new Activity({ action, type });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createOrUpdateCard = async (req, res) => {
  try {
    const { action, type } = req.body;
    const newActivity = new Activity({ action, type });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createOrUpdateBoard,
  createOrUpdateList,
  createOrUpdateCard
};