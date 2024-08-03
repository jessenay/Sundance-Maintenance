const mongoose = require('mongoose');

const fallTaskSchema = new mongoose.Schema({
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

const FallTask = mongoose.model('FallTask', fallTaskSchema);

module.exports = FallTask;
