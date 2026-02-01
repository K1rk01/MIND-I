const express = require('express');
const jwt = require('jsonwebtoken');
const Alert = require('../models/Alert');
const CheckIn = require('../models/CheckIn');
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

// Get alerts
router.get('/alerts', verifyToken, async (req, res) => {
  if (req.user.role !== 'counsellor') return res.status(403).send('Access denied');
  const alerts = await Alert.find().populate('checkInId').sort({ createdAt: -1 });
  res.json(alerts);
});

// Update alert
router.put('/alert/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'counsellor') return res.status(403).send('Access denied');
  const { status, notes } = req.body;
  const alert = await Alert.findById(req.params.id);
  alert.status = status;
  alert.notes.push({ text: notes, timestamp: new Date(), counsellorId: req.user.id });
  await alert.save();
  res.send('Alert updated');
});

module.exports = router;