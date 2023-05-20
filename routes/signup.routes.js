const express = require("express");
const router = express.Router();

// signup controller
const signupController = require("../controllers/signup.controller");

router.post("/", signupController.signUp);

module.exports = {
  router
};
