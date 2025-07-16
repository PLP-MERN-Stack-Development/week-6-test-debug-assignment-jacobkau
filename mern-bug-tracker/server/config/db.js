const mongoose = require('mongoose');
const { mongoURI } = require('./config');

const connectDB = async () => {
  await mongoose.connect(mongoURI);
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};

module.exports = { connectDB, disconnectDB };
