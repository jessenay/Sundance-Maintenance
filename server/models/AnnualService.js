// models/AnnualService.js
const mongoose = require('mongoose');

const annualServiceSchema = new mongoose.Schema({
  component: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component',
    required: true
  },
  task: String,
  dateCompleted: Date,
  completedBy: String,
  testValues: String,
  notes: String,
  procedureLocations: String
});

const AnnualService = mongoose.model('AnnualService', annualServiceSchema);

module.exports = AnnualService;
