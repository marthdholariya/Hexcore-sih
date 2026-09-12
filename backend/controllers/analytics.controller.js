const axios = require('axios');

// Base URL for the Python AI service
const AI_SERVICE_URL = 'http://localhost:5001';

// Helper to forward request and handle errors
async function forwardRequest(req, res, path, params = {}) {
  try {
    const response = await axios.get(`${AI_SERVICE_URL}${path}`, { params });
    res.json(response.data);
  } catch (err) {
    console.error('[Analytics Controller] Error forwarding request:', err.message);
    res.status(500).json({ error: 'AI service unavailable', details: err.message });
  }
}

// Placeholder generic analytics (optional)
exports.getAnalytics = async (req, res) => {
  res.json({ success: true, data: [] });
};

// GET /api/analytics/placement?trainee_id=...
exports.getPlacement = async (req, res) => {
  const { trainee_id } = req.query;
  await forwardRequest(req, res, '/api/analytics/placement', { trainee_id });
};

// GET /api/analytics/skill-gap?trainee_id=...
exports.getSkillGap = async (req, res) => {
  const { trainee_id } = req.query;
  await forwardRequest(req, res, '/api/analytics/skill-gap', { trainee_id });
};

// GET /api/analytics/program-effectiveness?provider_id=...
exports.getProgramEffectiveness = async (req, res) => {
  const { provider_id } = req.query;
  await forwardRequest(req, res, '/api/analytics/program-effectiveness', { provider_id });
};