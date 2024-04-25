const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  dateCompleted: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  workDescription: {
    type: String,
    required: true
  },
  partsUsed: {
    type: String,
    required: true
  },
  completedBy: {
    type: String,
    required: true
  }
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
