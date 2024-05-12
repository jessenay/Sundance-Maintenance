const mongoose = require('mongoose');

const towerServiceSchema = new mongoose.Schema({
  dateCompleted: String,
  uphillOrDownhill: String,
  workDescription: String,
  partsUsed: String,
  completedBy: String,
  tower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tower'
  }
});

const TowerService = mongoose.model('TowerService', towerServiceSchema);
module.exports = TowerService;