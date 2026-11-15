const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name: { type: String, required: true }, email: { type: String, required: true }, company: String, phone: String, product: String, quantity: Number, requirements: String, status: { type: String, enum: ['new', 'contacted', 'quoted', 'closed'], default: 'new' } }, { timestamps: true });
module.exports = mongoose.model('Quote', schema);
