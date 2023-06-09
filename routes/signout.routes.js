const express = require("express");
const router = express.Router();

// auth Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// userInfo controller
const SignOutController = require("../controllers/signout.controller");
const signOutController = new SignOutController();

router.delete("/", authMiddleware, signOutController.signOut);

module.exports = {
  router
};

/**
 * @swagger
 * tags:
 *   - name: LOGOUT
 *     description: 로그아웃 API
 * paths:
 *  /api/logout:
 *    delete:
 *      summary: "로그아웃"
 *      description: "DELETE 메소드, 로그아웃 API"
 *      tags: [LOGOUT]
 *      parameters:
 *       - in: header
 *         name: logout
 *         description: 로그아웃
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 *      responses:
 *        "201":
 *          description: 로그아웃 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  {}
 *        "403":
 *          description: 기타 에러
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "로그아웃에 실패했습니다." }
 */
