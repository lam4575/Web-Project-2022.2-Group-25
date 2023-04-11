const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://admin1:1597532486ls@webproject.33ja8hi.mongodb.net/test';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect('mongodb+srv://admin1:1597532486ls@webproject.33ja8hi.mongodb.net/test', options)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
