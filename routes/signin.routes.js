const express = require("express");
const router = express.Router();

// signup controller
const signinController = require("../controllers/signin.controller");
router.post("/", signinController.signIn);

module.exports = {
  router
};
