const mongoose = require('mongoose');

const procedureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  component: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component',
    required: true,
  }
});

const Procedure = mongoose.model('Procedure', procedureSchema);
module.exports = Procedure;
