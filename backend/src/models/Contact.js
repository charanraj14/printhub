const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name: String, email: String, subject: String, message: String, status: { type: String, default: 'new' } }, { timestamps: true });
module.exports = mongoose.model('Contact', schema);
