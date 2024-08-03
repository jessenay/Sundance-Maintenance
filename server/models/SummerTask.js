const mongoose = require('mongoose');

const summerTaskSchema = new mongoose.Schema({
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

const SummerTask = mongoose.model('SummerTask', summerTaskSchema);

module.exports = SummerTask;
