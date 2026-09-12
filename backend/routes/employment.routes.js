const express = require("express");

const { getEmployment } = require("../controllers/employment.controller");

const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticateToken, getEmployment);

module.exports = router;