const Card = require('../models/card');
const List = require('../models/list');
const { createActivity, updateBoardActivityLog } = require('../utils/createActivity');

const createCard = async (req, res) => {
  try {
    const { listId, boardId } = req.params;
    const { cardTitle, description } = req.body;

    const list = await List.findById(listId).populate('cards');
    const card = await Card.create({ cardTitle, description });
    list.cards.push(card)
    await list.save();
    res.status(201).json(card);
    //Add activity log
    
    const activity = await createActivity('List', list._id, 'added', req.user._id);
    await updateBoardActivityLog(list._id, activity);

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

    
    const activity = await createActivity('List', list._id, 'updated', req.user._id);
    await updateBoardActivityLog(list._id, activity);

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

    const list = await List.findById(listId).populate('cards');
    list.remove(cardId);

    const activity = await createActivity('List', list._id, 'added', req.user._id);
    await updateBoardActivityLog(list._id, activity);


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