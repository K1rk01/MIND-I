const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'counsellor', 'school_admin', 'super_admin'], required: true },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' }, // for counsellors and school_admins
  anonymousId: { type: String }, // for students
  verified: { type: Boolean, default: false },
  twoFactorEnabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);