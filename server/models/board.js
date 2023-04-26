const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  boardName: {
    type: String,
    required: true
  },
  description: String,
  visibility:String,
  members:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }],
  activityLog: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }]
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;