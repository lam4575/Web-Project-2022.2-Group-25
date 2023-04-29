const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {type:String,
  required:true
},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

