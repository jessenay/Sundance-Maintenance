// models/Tower.js
const mongoose = require('mongoose');

const towerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TowerService'
    }
  ]
});

const Tower = mongoose.model('Tower', towerSchema);
module.exports = Tower;
