const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }
  ],
  annualServices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AnnualService'
    }
  ]
});

const Component = mongoose.model('Component', componentSchema);
module.exports = Component;
