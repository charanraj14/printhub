const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

module.exports = async () => {

    if (cached.conn) {
        return cached.conn;
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is missing');
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI)
            .then((mongoose) => mongoose)
            .catch((error) => {
                cached.promise = null;
                throw error;
            });
    }

    cached.conn = await cached.promise;

    console.log('MongoDB connected');

    return cached.conn;
};