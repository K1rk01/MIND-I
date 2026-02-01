const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emoji: { type: String },
  text: { type: String },
  timestamp: { type: Date, default: Date.now },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  aiAnalysis: { type: Object }, // store AI response
});

module.exports = mongoose.model('CheckIn', checkInSchema);