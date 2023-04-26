const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const activitySchema = new Schema({
  action: {
    type: String,
    required: true
  },
  entity: {
    type: String,
    required: true
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'entity'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;