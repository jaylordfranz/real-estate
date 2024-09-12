const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String },
  type: { type: String, enum: ['house', 'apartment'], required: true },
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
  images: [{ type: String }],
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Property', propertySchema);
