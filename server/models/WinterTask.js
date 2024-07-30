// server/models/WinterTask.js
const mongoose = require('mongoose');

const winterTaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const WinterTask = mongoose.model('WinterTask', winterTaskSchema);

module.exports = WinterTask;
