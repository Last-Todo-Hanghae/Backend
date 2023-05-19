const express = require("express");
const router = express.Router();

// auth Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// signup controller
const signinController = require("../controllers/signinController");
router.post("/", signinController.signIn);
router.put("/", authMiddleware, signinController.userInfoChange);
router.delete("/", authMiddleware, signinController.signOut);

module.exports = {
  router
};
