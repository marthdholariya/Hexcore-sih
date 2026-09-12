const express = require("express");
const { getEducation } = require("../controllers/education.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticateToken, getEducation);

module.exports = router;