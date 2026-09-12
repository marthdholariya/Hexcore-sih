const express = require("express");
const { getPlanning } = require("../controllers/planning.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticateToken, getPlanning);

module.exports = router;