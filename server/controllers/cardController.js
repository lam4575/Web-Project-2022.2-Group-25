const Card = require('../models/card');
const List = require('../models/list');
const Comment = require('../models/comment');
const { createActivity, updateBoardActivityLog } = require('../utils/createActivity');

const createCard = async (req, res) => {
  try {
    const { listId, boardId } = req.params;
    const createdBy = req.user._id
    const { cardTitle, description } = req.body;

    const list = await List.findById(listId).populate('cards');
    const card = await Card.create({ cardTitle, description, createdBy });
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


const joinCard = async (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.params.userId;
  try {
    // Find the card
    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Check if the user is already joined
    if (card.assignTo.includes(userId)) {
      return res.status(400).json({ message: 'User already joined the card' });
    }

    // Add the user to the join array
    card.assignTo.push(userId);
    await card.save();
    await card.populate('assignTo');
    
    return res.status(200).json({card});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
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


const addWatching = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;
    let card = await Card.findById(cardId);
    if(card.watching.includes(userId)) {
      card.watching.remove(userId)
    } else {
      card.watching.push(userId); // Push userId to the watching array
    }
    await card.save();
    res.status(200).json(card);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
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

    let comment = await Comment
      .create({ text, createdBy })

    const card = await Card.findById(cardId);
    card.comments.push(comment._id);
    await card.save();

    comment = await comment.populate({
      path: "createdBy",
      select: ["firstName", "lastName"]
    });
    res.status(200).json(comment);

    const activity = await createActivity('Card', card._id, 'added comment', req.user._id);
    await updateBoardActivityLog(card._id, activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const deleteCard = async (req, res) => {
  try {
    const { cardId, listId } = req.params;
    await Card.findByIdAndDelete(cardId);
    res.status(200).json({ message: 'Card deleted successfully' });

    const list = await List.findById(listId);
    list.cards.remove(cardId);
    await list.save();

    const activity = await createActivity('Card', cardId, 'removed', req.user._id);
    await updateBoardActivityLog(cardId, activity);


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId)
      .populate({
        path: 'comments',
        populate: {
          path: 'createdBy',
          select: 'firstName lastName avatar'
        }
      }).populate({
        path: 'files',
        populate: {
          path: 'owner',
          select: 'firstName lastName username'
        }
      }).populate("assignTo");

    res.status(200).json(card);
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
  addComment,
  getCard,
  addWatching,
  joinCard
};