const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const School = require('../models/School');
const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Create school
router.post('/school', verifyToken, async (req, res) => {
  if (req.user.role !== 'super_admin') return res.status(403).send('Access denied');
  const school = new School(req.body);
  await school.save();
  res.status(201).json(school);
});

// Invite counsellor
router.post('/invite-counsellor', verifyToken, async (req, res) => {
  if (req.user.role !== 'school_admin') return res.status(403).send('Access denied');
  // Logic to send invite email, for now just create user
  const { email } = req.body;
  const user = new User({ email, password: 'temp', role: 'counsellor', schoolId: req.user.schoolId });
  await user.save();
  res.send('Counsellor invited');
});

module.exports = router;