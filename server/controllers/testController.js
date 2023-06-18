const sendMail = require('../services/mailer');
const { uploadFile, getFile } = require('../services/fileUpload');
const { ROOT_ABSOLUTE } = require('../configs');
const Card = require('../models/card');

const sendTestMail = async (req, res) => {
  const { subject, content, receiver } = req.body;
  const mail = {
    subject: subject,
    content: content
  };

  const returnMessage = await sendMail(mail, receiver);

  console.log(returnMessage);
  res.status(200).json({ message: returnMessage });
};

const sendEmailToWatching = async (req,res) => {
  const { subject, content } = req.body;
  const {cardId} = req.params;
  try {
    const card = await Card.findById(cardId).populate('watching');
    if (!card) {
      throw new Error('Card not found');
    }
    const receivers = card.watching.map(user => user.email);
    const mail = {
      subject: subject,
      content: content
    };
    const returnMessages = await Promise.all(receivers.map(receiver => sendMail(mail, receiver)));
    console.log(returnMessages);
    res.status(200).json({ messages: returnMessages });
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const uploadTestFile = async (req, res) => {
  const file = req.files.demo;
  const cardId = req.params.cardId;

  const message = await uploadFile(file, cardId, req.user);
  res.status(200).json({ message: message });
};

const getTestFile = async (req, res) => {
  const file = req.params.id;

  const message = await getFile(file, req.user);

  if (message.status == 200)
    res.sendFile(message.path, { root: ROOT_ABSOLUTE });
  else
    res.status(message.status).json({ message: message.text });
};

module.exports = {
  sendTestMail,
  uploadTestFile,
  getTestFile,
  sendEmailToWatching
};