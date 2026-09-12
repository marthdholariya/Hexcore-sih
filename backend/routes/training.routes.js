const express = require("express");
const { getTraining } = require("../controllers/training.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticateToken, getTraining);

module.exports = router;