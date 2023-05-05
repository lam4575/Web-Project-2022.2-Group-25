require('dotenv').config()

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const BASE_URL = process.env.BASE_URL;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;




const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

const CONFIGS = {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    BASE_URL,
    mongooseOptions,
    EMAIL_USERNAME,
    EMAIL_PASSWORD
}


module.exports = CONFIGS