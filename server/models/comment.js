const mongoose = require('mongoose');
const dayjs = require("dayjs")

const commentSchema = new mongoose.Schema({
  text: {type:String,
  required:true
},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: () => dayjs().toDate() }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

