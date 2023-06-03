const Card = require('../models/card');

const createCard = async (req, res) => {
  try {
    const { listId, boardId } = req.params;
    const { cardTitle, description } = req.body;
    const card = await Card.create({ cardTitle, description });
    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createCard
};