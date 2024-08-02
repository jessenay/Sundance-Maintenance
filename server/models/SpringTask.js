const mongoose = require('mongoose');

const springTaskSchema = new mongoose.Schema({
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

const SpringTask = mongoose.model('SpringTask', springTaskSchema);

module.exports = SpringTask;
