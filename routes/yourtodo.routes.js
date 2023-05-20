const express = require("express");
const router = express.Router();

// auth Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// yourtodo controller
const yourtodoController = require("../controllers/yourtodo.controller");
router.get("/", authMiddleware, yourtodoController.yourtodoGet);
router.get("/:userId", authMiddleware, yourtodoController.yourtodoGetDetail);
router.put("/:userId/like", authMiddleware, yourtodoController.yourtodoPutLike);

module.exports = {
  router
};