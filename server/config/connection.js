require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://jessenay26:LD1tpN5bZXuCw1et@cluster0.knlwguy.mongodb.net/LiftsDB?retryWrites=true&w=majority&appName=Cluster0');

module.exports = mongoose.connection;
