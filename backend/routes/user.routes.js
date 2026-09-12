const express = require("express");

const { getUsers } = require("../controllers/user.controller");

const authenticateToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles("government"), getUsers);

module.exports = router;