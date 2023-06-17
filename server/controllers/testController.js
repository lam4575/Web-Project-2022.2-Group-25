const sendMail = require('../services/mailer');
const { uploadFile, getFile } = require('../services/fileUpload');
const { ROOT_ABSOLUTE } = require('../configs');

const sendTestMail = async (req, res) => {
  const { subject, content, recceiver } = req.body;
  const mail = {
    subject: subject,
    content: content
  };

  const returnMessage = await sendMail(mail, recceiver);

  console.log(returnMessage);
  res.status(200).json({ message: returnMessage });
};

const uploadTestFile = async (req, res) => {
  const file = req.files.demo;
  const cardId = req.params.cardId;

  const message = await uploadFile(file, cardId, req.user);
  console.log(message);
  res.status(200).json( {message: message, name: file.name });
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
  getTestFile
};