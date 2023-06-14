const mongoose = require('mongoose');
const User = require('./user');
const Activity = require('./activity');

const cardSchema = new mongoose.Schema({
  cardTitle: {
    type: String,
    required: true
  },
  watching: {
    type: Boolean,
    default: false
  },
  checklist: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  labels: {
    type: [{
      labelTitle: String,
      color: String,
    }],
    default: [],
  },
  dueDate: {
    type: Date,
    default: null
  },
  assignTo: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    default: [],
  },
  description: {
    type: String,
    default:''
  },
  createdBy:{
    type:mongoose.ObjectId,
    ref:"User"
  },
  comments: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    default: [],
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
