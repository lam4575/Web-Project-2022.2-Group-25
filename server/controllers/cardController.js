const Card = require('../models/card');
const List = require('../models/list');
const Comment = require('../models/comment');
const { createActivity, updateBoardActivityLog } = require('../utils/createActivity');

const createCard = async (req, res) => {
  try {
    const { listId, boardId } = req.params;
    const createdBy =  req.user._id
    const { cardTitle , description} = req.body;

    const list = await List.findById(listId).populate('cards');
    const card = await Card.create({ cardTitle , description, createdBy });
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
    const { cardTitle, description, watching, checklist, labels, assignTo, comments, dueDate } = req.body;
    const card = await Card.findByIdAndUpdate(cardId, { cardTitle, description, watching, checklist, labels, assignTo, comments, dueDate }, { new: true });
    res.status(200).json(card);

    
    const activity = await createActivity('List', card._id, 'updated', req.user._id);
    await updateBoardActivityLog(card._id, activity);

  } catch (error) { 
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCardComments = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId).populate({
      path: 'comments',
      populate: {
        path: 'createdBy',
        select: 'firstName lastName avatar'
      }
    });
    res.status(200).json(card.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addComment = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { text } = req.body;
    const createdBy = req.user._id;

    const comment = await Comment.create({ text, createdBy });
    const card = await Card.findById(cardId);
    card.comments.push(comment._id);
    await card.save();

    res.status(200).json(card);

    const activity = await createActivity('Card', card._id, 'added comment', req.user._id);
    await updateBoardActivityLog(card._id, activity);

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
  deleteCard,
  getCardComments,
  addComment
};