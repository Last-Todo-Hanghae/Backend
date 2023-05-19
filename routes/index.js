const express = require("express");
const router = express.Router();

// 라우터 구성
const signupRouter = require("./signup.routes");
const signinRouter = require("./signin.routes");
const mytodoRouter = require("./mytodo.routes");
const yourtodoRouter = require("./yourtodo.routes");

router.use("/signup", signupRouter.router);
router.use("/signin", signinRouter.router);
router.use("/mytodo", mytodoRouter.router);
router.use("/yourtodo", yourtodoRouter.router);

module.exports = router;
