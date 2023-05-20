const express = require("express");
const router = express.Router();

// auth Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// userInfo controller
const signoutController = require("../controllers/signout.controller");
router.delete("/", authMiddleware, signoutController.signOut);

module.exports = {
  router
};
