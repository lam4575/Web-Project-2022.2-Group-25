const express = require('express');
const sendMail = require('../services/mailer');
const testRouter = express.Router();


testRouter.post('/test/mail', async (req, res) => {
        const { subject, content, recceiver } = req.body;
        const mail = {
            subject: subject,
            content: content
        };
        console.log(req.body);
        
        const returnMessage = await sendMail(mail, recceiver);

        console.log(returnMessage);
        res.status(200).json({message:returnMessage});
        
})

module.exports = testRouter;