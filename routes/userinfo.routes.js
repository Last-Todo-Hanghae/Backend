const express = require("express");
const router = express.Router();

// auth Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// userInfo controller
const userInfoController = require("../controllers/userinfo.controller");
router.get("/", authMiddleware, userInfoController.getUserInfo);
router.put("/", authMiddleware, userInfoController.pwChange);

module.exports = {
  router
};

/**
 * @swagger
 * paths:
 *  /api/userinfo:
 *    get:
 *      summary: "유저 정보 조회 (userName)"
 *      description: "GET 메소드, 유저 정보 조회(userName) API"
 *      tags: [USERINFO]
 *      parameters:
 *       - in: header
 *         name: userinfo
 *         description: 로그인된 사용자 아이디 조회
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 *      responses:
 *        "200":
 *          description: 유저 정보 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { 
 *                    "userName": "user01"
 *                  }
 *        "401":
 *          description: 토큰 정보에 있는 userId 유효성 검사 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { 
 *                    "message": "토큰 정보가 올바르지 않습니다."
 *                  }
 *        "402":
 *          description: 입력 데이터 유효성 검증 실패 (공백 데이터 입력)
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "입력값이 올바르지 않습니다." }
 *        "403":
 *          description: 기타 에러
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "유저 정보 조회에 실패했습니다." }
 *    put:
 *      summary: "비밀 번호 변경"
 *      description: "PUT 메소드, 비밀 번호 변경 API"
 *      tags: [USERINFO]
 *      parameters:
 *       - in: header
 *         name: userinfo
 *         description: 비밀번호 변경
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 *       - in: body
 *         name: userinfo
 *         description: 비밀번호 변경
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             userPassword:
 *               type: string
 *             newPassword:
 *               type: string
 *      responses:
 *        "201":
 *          description: 유저 정보 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  {}
 *        "401":
 *          description: 비밀번호 또는 아이디가 불일치
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { 
 *                    "message": "비밀번호 또는 아이디가 일치하지 않습니다."
 *                  }
 *        "402":
 *          description: 입력 데이터 유효성 검증 실패 (공백 데이터 입력)
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "입력값이 올바르지 않습니다." }
 *        "403":
 *          description: 기타 에러
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "비밀번호 변경에 실패했습니다." }
 */
