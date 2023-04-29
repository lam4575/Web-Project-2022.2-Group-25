const Activity = require('../models/activity');
const Board = require("../models/board")

async function createActivity(entityType, entityId, action, createdBy) {
  try {
    const activity = new Activity({
      entity: entityType,
      entityId: entityId,
      action: action,
      createdBy: createdBy
    });

    await activity.save();

    return activity;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating activity');
  }
}

async function updateBoardActivityLog(boardId, activity) {
  try {
    await Board.updateOne({ _id: boardId }, { $push: { activityLog: activity } });
  } catch (error) {
    console.error(error);
    throw new Error('Error updating board activity log');
  }
}

module.exports = {createActivity, updateBoardActivityLog}