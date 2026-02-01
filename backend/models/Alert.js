const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  checkInId: { type: mongoose.Schema.Types.ObjectId, ref: 'CheckIn', required: true },
  counsellorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'reviewed', 'resolved'], default: 'pending' },
  notes: [{ text: String, timestamp: Date, counsellorId: mongoose.Schema.Types.ObjectId }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Alert', alertSchema);