const express = require("express");
const router = express.Router();

// signup controller
const signupController = require("../controllers/signup.controller");

/**
 * @swagger
 * paths:
 *  /api/signup:
 *    post:
 *      summary: "회원가입"
 *      description: "POST 메소드, 회원가입 요청 API"
 *      tags: [SIGNUP]
 *      responses:
 *        "201":
 *          description: 회원가입 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "401":
 *          description: 닉네임 중복
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { message: "중복된 닉네임 입니다." }
 *        "402":
 *          description: 입력 데이터 유효성 검증 실패 (공백 데이터 입력)
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { message: "입력값이 올바르지 않습니다." }
 *        "403":
 *          description: 기타 에러
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { message: "회원가입에 실패했습니다." }
 */
router.post("/", signupController.signUp);

module.exports = {
  router
};
