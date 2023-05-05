const nodemailer = require("nodemailer")
const { EMAIL_PASSWORD, EMAIL_USERNAME } = require("../configs")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD
    }
});

const sendMail = async (mail, recceiver) => {

    const { subject, content } = mail;
    const mailOption = {
        from: EMAIL_USERNAME,
        to: recceiver,
        subject: subject,
        text: content
    }
    try {
        await transporter.sendMail(mailOption);
    }
    catch (e) {
        return e.message;
    }
    return "OK";
}

module.exports = sendMail