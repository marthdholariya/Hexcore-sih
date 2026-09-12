const express = require("express");
const { getJobs } = require("../controllers/jobs.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticateToken, getJobs);

module.exports = router;