// Import required modules
const Card = require('../models/Card');
const express = require('express');
const router = express.Router();

// Create route for creating a new card
router.post('/boards/:boardId/lists/:listId/card', auth, async (req, res) => {
  try {
    const { listId, boardId } = req.params;
    const { cardTitle } = req.body;
    // Create a new card with the given cardTitle, listId, and boardId
    const card = await Card.create({ cardTitle, listId, boardId });
    // Respond with the newly created card
    res.status(201).json(card);
  } catch (error) {
    // Log the error to the console
    console.error(error);
    // Respond with a 500 status code and an error message
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;// Import Card model
