const express = require('express');
const { auth } = require('../middlewares/auth');
const { sendTestMail, uploadTestFile, getTestFile } = require('../controllers/testController');
const testRouter = express.Router();

testRouter.post('/test/mail', sendTestMail);

testRouter.post('/test/files', auth, uploadTestFile);

// Add authentication middleware if needed
testRouter.get('/test/files/:id', /*auth, */ getTestFile);

module.exports = testRouter;