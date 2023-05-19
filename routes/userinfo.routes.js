const express = require("express");
const router = express.Router();

// auth Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// userInfo controller
const userInfoController = require("../controllers/userinfo.controller");
router.put("/", authMiddleware, userInfoController.pwChange);

module.exports = {
  router
};
