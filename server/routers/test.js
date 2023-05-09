const express = require('express');
const sendMail = require('../services/mailer');
const { auth } = require('../middlewares/auth');
const { uploadFile, getFile } = require('../services/fileUpload');
const { ROOT_ABSOLUTE } = require('../configs');
const testRouter = express.Router();


testRouter.post('/test/mail', async (req, res) => {
    const { subject, content, recceiver } = req.body;
    const mail = {
        subject: subject,
        content: content
    };

    const returnMessage = await sendMail(mail, recceiver);

    console.log(returnMessage);
    res.status(200).json({ message: returnMessage });

})

testRouter.post('/test/files', auth, async (req, res) => {
    const file = req.files.demo;

    const message = await uploadFile(file, req.user);
    res.status(200).json({ message: message });
})
// Add authentication middleware if needed
testRouter.get('/test/files/:id',/*auth, */ async (req, res) => {
    const file = req.params.id;

    const message = await getFile(file, req.user);

    if (message.status == 200)
        res.sendFile(message.path,{ root: ROOT_ABSOLUTE });
    else
        res.status(message.status).json({ message: message.text });
})

module.exports = testRouter;