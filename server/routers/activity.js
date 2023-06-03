const express = require('express');
const router = express.Router();
const {
  createOrUpdateBoard,
  createOrUpdateList,
  createOrUpdateCard
} = require('../controllers/activityController');

// Route for creating or updating board
router.post('/board', createOrUpdateBoard);

// Route for creating or updating list
router.post('/list', createOrUpdateList);

// Route for creating or updating card
router.post('/card', createOrUpdateCard);

module.exports = router;