const mongoose = require('mongoose');
module.exports = async () => {
    console.log("uri:", process.env.MONGO_URI);
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is missing. Configure backend/.env');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
};
