const express = require("express");
const router = express.Router();

// 라우터 구성
const signupRouter = require("./signup.routes");
const signinRouter = require("./signin.routes");
const userinfoRouter = require("./userinfo.routes");
const signoutRouter = require("./signout.routes");
const mytodoRouter = require("./mytodo.routes");
const yourtodoRouter = require("./yourtodo.routes");

router.use("/signup", signupRouter.router);
router.use("/login", signinRouter.router);
router.use("/userinfo", userinfoRouter.router);
router.use("/signout", signoutRouter.router);
router.use("/mytodo", mytodoRouter.router);
router.use("/yourtodo", yourtodoRouter.router);

module.exports = router;
