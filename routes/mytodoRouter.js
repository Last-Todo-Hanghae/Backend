const express = require("express");
const router = express.Router();

// auth Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// mytodo controller
const mytodoController = require("../controllers/mytodoController");
router.post("/", authMiddleware, mytodoController.mytodoPost);
router.get("/", authMiddleware, mytodoController.mytodoGet);
router.put("/:todoId/priority", authMiddleware, mytodoController.mytodoPutPriority);
router.put("/:todoId/content", authMiddleware, mytodoController.mytodoPutContent);
router.put("/:todoId/isdone", authMiddleware, mytodoController.mytodoPutIsDone);
router.delete("/:todoId", authMiddleware, mytodoController.mytodoDelete);

module.exports = {
  router
};
