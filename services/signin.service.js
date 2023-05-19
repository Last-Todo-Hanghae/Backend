// dotenv 파일을 통해 시크릿 정보 가저오기
require("dotenv").config();
const env = process.env;
const jwt = require("jsonwebtoken");

// 모델 가져오기
const { User, Token } = require("../models");

// Sequlize Operation 연산 사용을 위해 추가
const { Op } = require("sequelize");

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
const signIn = async (userName, userPassword) => {
  try {
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

    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "로그인에 실패했습니다.",
    });
  }
};

// 비밀번호 변경 API
const userInfoChange = async (userName, userPassword, newPassword) => {
  try {
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
          [Op.and]: [{ userName }, { userPassword }],
        },
      }
    );

    return {};
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "비밀번호 변경에 실패했습니다.",
    });
  }
};

// 로그아웃 API
const signOut = async (userId) => {
  try {
    // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장
    await Token.destroy({ where: { refreshToken: userId } });

    return true;
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "로그아웃에 실패했습니다.",
    });
  }
};

module.exports = {
  signIn,
  userInfoChange,
  signOut,
};
