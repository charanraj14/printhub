const mongoose = require('mongoose');
const schema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true }, items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, quantity: { type: Number, min: 1, default: 1 }, customization: { size: String, material: String, color: String, artwork: String } }] }, { timestamps: true });
module.exports = mongoose.model('Cart', schema);
