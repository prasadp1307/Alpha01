const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected successfully to:', process.env.MONGODB_URI);
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        console.error('Please ensure MongoDB is running locally or check your MONGODB_URI in .env');
        process.exit(1);
    }
};

module.exports = connectDB;
