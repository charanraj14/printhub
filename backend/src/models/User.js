const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true }, password: { type: String, required: true, minlength: 8 }, phone: String, role: { type: String, enum: ['customer', 'admin'], default: 'customer' }, addresses: [{ label: String, line1: String, city: String, state: String, pincode: String }] }, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
