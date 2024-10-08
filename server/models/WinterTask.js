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
  initials: {
    type: String,
  },
  dateCompleted: {
    type: String,
  },
});

const WinterTask = mongoose.model('WinterTask', winterTaskSchema);

module.exports = WinterTask;
