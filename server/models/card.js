const mongoose = require('mongoose');
const User = require('./user');
const Activity = require('./activity');

const cardSchema = new mongoose.Schema({
  cardTitle: {
    type: String,
    required: true
  },
  labels:[{
    lableTitle:String,
    color: String
  }],
  dueDate: {
    type: Date
  },
  assignTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  description: {
    type: String
  },
  createdBy:{
    type:mongoose.ObjectId,
    ref:"User"
  },
  comments:[{
    type:mongoose.ObjectId,
    ref:"Comment"
  }]
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
