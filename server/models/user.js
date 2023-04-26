const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs'); // require bcryptjs here
const jwt = require('jsonwebtoken'); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  tokens: [
    String
  ],
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  }],
  activityLog: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  tokens: [
    String
  ]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat(token);
  await user.save();
  return token;
};


const User = mongoose.model('User', userSchema);

module.exports = User;

