const mongoose = require('mongoose');

const liftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  components: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Component'
    }
  ],
  towers: [{ type: mongoose.Schema.Types.ObjectId, 
  ref: 'Tower'
}]
});

const Lift = mongoose.model('Lift', liftSchema);
module.exports = Lift;
