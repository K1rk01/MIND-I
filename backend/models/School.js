const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['secondary', 'university'], required: true },
  county: { type: String, required: true },
  contactEmail: { type: String, required: true },
  address: { type: String },
  mouSigned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('School', schoolSchema);