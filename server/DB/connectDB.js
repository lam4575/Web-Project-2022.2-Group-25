const mongoose = require('mongoose');
const { MONGODB_URI, mongooseOptions } = require('../configs/index');

// const connectionString = 'mongodb+srv://admin1:1597532486ls@webproject.33ja8hi.mongodb.net/test';

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
