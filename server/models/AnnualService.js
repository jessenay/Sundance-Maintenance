const mongoose = require('mongoose');

const annualServiceSchema = new mongoose.Schema({
    component: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component', // Referencing the Component model
        required: true
    },
    task: String,
    dateCompleted: String,
    completedBy: String,
    testValues: String,
    notes: String,
    procedureLocations: String
});

const AnnualService = mongoose.model('AnnualService', annualServiceSchema);

module.exports = AnnualService;
