// 모델 가져오기
const { User, Token } = require("../models");

// 유저 조회
const findUser = async (userName) => {
  const user = await User.findOne({ where: { userName } });

  return user;
};

// 토큰 조회
const findToken = async (refreshToken) => {
  const token = await Token.findAll({
		attributes: ["refreshToken"], 
		where: { refreshToken },
  });

  return token;
};

// 토큰 삭제
const deleteToken = async (refreshToken) => {
  await Token.destroy({ 
		where: { refreshToken } 
	});

  return true;
};

// 로그인
const signIn = async (refreshToken) => {
  // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장
  await Token.create({ refreshToken });

  return true;
};

module.exports = {
  findUser, findToken, deleteToken, signIn,
};
