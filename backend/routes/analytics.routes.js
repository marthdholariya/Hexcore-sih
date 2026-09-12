const express = require("express");
const { getAnalytics } = require("../controllers/analytics.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/",authenticateToken, getAnalytics);

module.exports = router;