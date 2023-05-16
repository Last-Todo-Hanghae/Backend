const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

// dotenv 파일을 통해 시크릿 정보 가저오기
require("dotenv").config();
const env = process.env;

// 모델 가져오기
const { User, Token } = require("../models");

// Sequlize Operation 연산 사용을 위해 추가
const { Op } = require("sequelize");

// 인증을 위한 미들웨어 가져오기
const authMiddleware = require("../middlewares/auth-middleware");

// 시크릿 키 정의
const secretKey = env.JWT_SECRET;

// Access Token 생성 함수
function createAccessToken(id, name) {
  const accessToken = jwt.sign({ userId: id, userName: name }, secretKey, {
    expiresIn: "1h",
  });
  return accessToken;
}

// Refresh Token 생성 함수
function createRefreshToken() {
  const refreshToken = jwt.sign({}, secretKey, { expiresIn: "7d" });
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

    // Refresh Token 존재여부 확인
    const checkToken = await Token.findAll({
      attributes: ["refreshToken"],
      where: { refreshToken: id },
    });

    if (checkToken) {
      await Token.destroy({ where: { refreshToken: id } });
    }

    // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장
    await Token.create({ refreshToken: id });

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

// 비밀번호 변경 API
router.put("/signin", authMiddleware, async (req, res) => {
  try {
    const { userName, userPassword, newPassword } = req.body;
    const user = await User.findOne({ where: { userName } });

    // 아이디 및 비밀번호 유효성 검사
    if (!user || userPassword !== user.userPassword) {
      return res.status(401).json({
        message: "비밀번호 또는 아이디가 일치하지 않습니다.",
      });
    }

    // 패스워드 변경
    await User.update(
      {
        userPassword: newPassword,
      },
      {
        where: {
          [Op.and]: [
            { userName },
            { userPassword },
          ],
        },
      }
    );

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "비밀번호 변경에 실패했습니다.",
    });
  }
});

// 로그아웃 API
router.delete("/signout", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user    

    // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장
    await Token.destroy({ where: { refreshToken: userId } });

    // 공백의 Access Token을 Cookie에 전달 하여 Access Token 정보 초기화
    res.cookie("accessToken", `Bearer `, { secure: false });
    // 공백의 Refresh Token을 Cookie에 전달 하여 Access Token 정보 초기화
    res.cookie("refreshToken", `Bearer `, { secure: false });

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "로그아웃에 실패했습니다.",
    });
  }
});

module.exports = router;
