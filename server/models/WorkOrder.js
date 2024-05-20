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
    required: true
  },
  toolsRequired: {
    type: [String],
    required: true
  },
  partsUsed: [partSchema],
  timeWorked: {
    type: String,
    required: true
  }
});

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);
module.exports = WorkOrder;