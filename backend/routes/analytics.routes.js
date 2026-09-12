const express = require('express');
const { getAnalytics, getPlacement, getSkillGap, getProgramEffectiveness } = require('../controllers/analytics.controller');
const authenticateToken = require('../middleware/auth.middleware');

const router = express.Router();

// Existing generic analytics data
router.get('/', authenticateToken, getAnalytics);

// New AI/ML analytics endpoints
router.get('/placement', authenticateToken, getPlacement);
router.get('/skill-gap', authenticateToken, getSkillGap);
router.get('/program-effectiveness', authenticateToken, getProgramEffectiveness);

module.exports = router;