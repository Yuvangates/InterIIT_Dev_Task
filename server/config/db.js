const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      
        console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);

    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);

    process.exit(1);
  }
};

module.exports = connectDB;