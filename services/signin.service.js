const CustomError = require("../utils/error.utils");

// dotenv 파일을 통해 시크릿 정보 가저오기
require("dotenv").config();
const env = process.env;
const jwt = require("jsonwebtoken");

// 모델 가져오기
const { User, Token } = require("../models");

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

// 로그인
const signIn = async (userName, userPassword) => {
  const user = await User.findOne({ where: { userName } });

  // 아이디 및 비밀번호 유효성 검사
  if (!user || userPassword !== user.userPassword) {
    throw new CustomError("비밀번호 또는 아이디가 일치하지 않습니다.", 401);
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

  return { accessToken, refreshToken };
};

module.exports = {
  signIn,
};
