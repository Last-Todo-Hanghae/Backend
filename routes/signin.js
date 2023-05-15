const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

// dotenv 파일을 통해 시크릿 정보 가저오기
require("dotenv").config();
const env = process.env;

// 모델 가져오기
const { User, Token } = require("../models");

// 시크릿 키 정의
const secretKey = env.JWT_SECRET;

// Access Token 생성 함수
function createAccessToken(id, name) {
  const accessToken = jwt.sign(
    { userId: id, userName: name }, secretKey, { expiresIn: "1h" }
  ); 
  return accessToken;
}

// Refresh Token 생성 함수
function createRefreshToken() {
  const refreshToken = jwt.sign(
    {}, secretKey, { expiresIn: "7d" }
  );
  return refreshToken;
}

// 로그인 API
router.post("/signin", async (req, res) => {
  try {
    const { userName, userPassword } = req.body;
    const user = await User.findOne({ where: { userName } });

    // 아이디 및 비밀번호 유효성 검사
    if (!user || userPassword !== user.userPassword) {
      return res.status(401).json({
        message: "비밀번호 또는 아이디가 일치하지 않습니다.",
      });
    }

    // JWT 토큰 생성 함수 정의
    const id = user.userId;
    const name = user.userName;
    const accessToken = createAccessToken(id, name);
    const refreshToken = createRefreshToken();

    // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장
    await Token.create({ refreshToken:id });

    // Access Token을 Cookie에 전달
    res.cookie("accessToken", `Bearer ${accessToken}`, { secure: false });
		// Refresh Token을 Cookie에 전달한다.
    res.cookie("refreshToken", `Bearer ${refreshToken}`, { secure: false });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "로그인에 실패했습니다.",
    });
  }
});

module.exports = router;
