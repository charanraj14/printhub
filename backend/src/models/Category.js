const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name: { type: String, required: true, unique: true }, slug: { type: String, required: true, unique: true }, description: String, image: String, active: { type: Boolean, default: true } }, { timestamps: true });
module.exports = mongoose.model('Category', schema);
