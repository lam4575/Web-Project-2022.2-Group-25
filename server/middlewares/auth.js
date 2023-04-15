// Importing the necessary modules
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../configs');

// Defining the authentication function
function authenticateUser(req, res, next) {
  // Extracting the token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split('Bearer ')[1];
  console.log(token)
  // Checking if the token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verifying the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Adding the user object to the request
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}


module.exports = {authenticateUser}
