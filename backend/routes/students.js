const express = require('express');
const jwt = require('jsonwebtoken');
const CheckIn = require('../models/CheckIn');
const Alert = require('../models/Alert');
const OpenAI = require('openai');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Middleware to verify token
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

// Submit check-in
router.post('/checkin', verifyToken, async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).send('Access denied');
  const { emoji, text } = req.body;
  const checkIn = new CheckIn({ studentId: req.user.id, emoji, text });
  
  // AI analysis
  const prompt = `Analyze this emotional check-in: Emoji: ${emoji}, Text: ${text}. Determine risk level: low, medium, high. Explain.`;
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  const analysis = response.choices[0].message.content;
  checkIn.aiAnalysis = analysis;
  if (analysis.includes('high')) checkIn.riskLevel = 'high';
  else if (analysis.includes('medium')) checkIn.riskLevel = 'medium';
  
  await checkIn.save();
  
  if (checkIn.riskLevel === 'high' || checkIn.riskLevel === 'medium') {
    const alert = new Alert({ checkInId: checkIn._id });
    await alert.save();
  }
  
  res.status(201).send('Check-in submitted');
});

module.exports = router;