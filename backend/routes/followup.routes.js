const express = require("express");
const { getFollowups } = require("../controllers/followup.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticateToken, getFollowups);

module.exports = router;