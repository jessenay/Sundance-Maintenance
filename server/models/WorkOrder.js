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
    required: false  // Made optional
  },
  toolsRequired: {
    type: [String],
    required: false  // Made optional
  },
  partsUsed: {
    type: [partSchema],
    required: false  // Made optional
  },
  timeWorked: {
    type: String,
    required: false  // Made optional
  }
});

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);
module.exports = WorkOrder;