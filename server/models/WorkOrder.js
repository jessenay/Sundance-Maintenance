const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});

const workOrderSchema = new mongoose.Schema({
  job: {
    type: String,
    required: true
  },
  personnel: {
    type: [String],
    required: false
  },
  toolsRequired: {
    type: [String],
    required: false
  },
  partsUsed: {
    type: [partSchema],
    required: false
  },
  timeWorked: {
    type: String,
    required: false
  },
  dateCompleted: {
    type: Date,
    required: false  // Set to true if the date is mandatory
  }
});

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);
module.exports = WorkOrder;
