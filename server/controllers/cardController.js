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

const updateCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { cardTitle, description } = req.body;
    const card = await Card.findByIdAndUpdate(cardId, { cardTitle, description }, { new: true });
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    await Card.findByIdAndDelete(cardId);
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createCard,
  updateCard,
  deleteCard
};