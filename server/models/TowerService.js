// models/TowerService.js
const mongoose = require('mongoose');

const towerServiceSchema = new mongoose.Schema({
  dateCompleted: { type: String, required: true },
  uphillOrDownhill: { type: String, required: true },
  workDescription: { type: String, required: true },
  partsUsed: { type: String, required: true },
  completedBy: { type: String, required: true }
});

const TowerService = mongoose.model('TowerService', towerServiceSchema);
module.exports = TowerService;
