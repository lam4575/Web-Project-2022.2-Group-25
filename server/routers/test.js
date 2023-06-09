const express = require('express');
const { auth } = require('../middlewares/auth');
const { sendTestMail, uploadTestFile, getTestFile, sendEmailToWatching } = require('../controllers/testController');
const testRouter = express.Router();

testRouter.post('/test/mail', sendTestMail);

testRouter.post('/cards/:cardId/send-watching', sendEmailToWatching);

testRouter.post('/test/files', auth, uploadTestFile);

testRouter.post("/cards/:cardId/files/send-file", auth, uploadTestFile)

// Add authentication middleware if needed
testRouter.get('/files/:id', /*auth, */ getTestFile);

module.exports = testRouter;