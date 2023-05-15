const express = require("express");
const indexRouter = express.Router();

// 라우터 구성
const signupRouter = require("./signup");
const signinRouter = require("./signin");
const todoRouter = require("./todo");

indexRouter.get("/", async (req, res) => {
  res.send("index 페이지 입니다.");
});

module.exports = { indexRouter, signupRouter, signinRouter, todoRouter };