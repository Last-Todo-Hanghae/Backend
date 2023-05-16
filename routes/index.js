const express = require("express");
const indexRouter = express.Router();

// 라우터 구성
const signupRouter = require("./signup");
const signinRouter = require("./signin");
const mytodoRouter = require("./mytodo");
const yourtodoRouter = require("./yourtodo");

indexRouter.get("/", async (req, res) => {
  res.send("index 페이지 입니다.");
});

module.exports = {
  indexRouter,
  signupRouter,
  signinRouter,
  mytodoRouter,
  yourtodoRouter,
};
