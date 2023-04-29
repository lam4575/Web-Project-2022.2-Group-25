// Import mongoose library
const mongoose = require('mongoose');

// Define list schema
const listSchema = new mongoose.Schema({
  listTitle: {
    type: String,
    required: true
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }]
});

// Create list model using list schema
const List = mongoose.model('List', listSchema);

// Export list model
module.exports = List;