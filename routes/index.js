const express = require("express");
const router = express.Router();

// 라우터 구성
const signupRouter = require("./signupRouter");
const signinRouter = require("./signinRouter");
const mytodoRouter = require("./mytodoRouter");
const yourtodoRouter = require("./yourtodoRouter");

router.use("/signup", signupRouter.router);
router.use("/signin", signinRouter.router);
router.use("/mytodo", mytodoRouter.router);
router.use("/yourtodo", yourtodoRouter.router);

module.exports = router;
