const express = require('express');
const jwt = require('jsonwebtoken');
const School = require('../models/School');
const Alert = require('../models/Alert');
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

// Get aggregated data
router.get('/dashboard', verifyToken, async (req, res) => {
  if (req.user.role !== 'super_admin') return res.status(403).send('Access denied');
  const schools = await School.countDocuments();
  const highRiskAlerts = await Alert.countDocuments({ status: 'pending' }); // simplified
  res.json({ schools, highRiskAlerts });
});

module.exports = router;