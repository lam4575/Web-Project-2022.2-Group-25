const mongoose = require('mongoose');
const mongoose = require('mongoose');
const User = require('./user');
const Activity = require('./activity');

const cardSchema = new mongoose.Schema({
  cardTitle: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  description: {
    type: String,
    required: true
  },
  activityLog: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }]
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
