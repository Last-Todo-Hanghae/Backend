const express = require("express");
const router = express.Router();

// signup controller
const signinController = require("../controllers/signin.controller");
router.post("/", signinController.signIn);

module.exports = {
  router
};

/**
 * @swagger
 * paths:
 *  /api/login:
 *    post:
 *      summary: "로그인"
 *      description: "POST 메소드, 로그인 요청 API"
 *      tags: [LOGIN]
 *      parameters:
 *       - in: body
 *         name: login
 *         description: 로그인 사용자 정보
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             userPassword:
 *               type: string
 *      responses:
 *        "200":
 *          description: 로그인 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { 
 *                    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE2ODQxNTMxMDYsImV4cCI6MTY4NDE1NjcwNn0.JqbkWtYGp3i9BTFrds2g_1e9XURgk-CF4IazBXMVTJ8",
 *                    "refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODQxNTMxMDYsImV4cCI6MTY4NDc1NzkwNn0.d4LZMZ89RAZdXHwfTWbnzYp_fvvkAn6Nf4NWdgf-tuY"
 *                  }
 *        "401":
 *          description: 로그인 실패 / 권한 오류
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  example1:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                    example:
 *                      message: "비밀번호 또는 아이디가 일치하지 않습니다."
 *                  example2:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                    example:
 *                      message: "로그인 후 이용 가능한 기능입니다."
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
 *                  { "message": "로그인에 실패했습니다." }
 */
