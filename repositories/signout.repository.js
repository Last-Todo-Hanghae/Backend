// 모델 가져오기
const { Token } = require("../models");

// 로그아웃 API
const signOut = async (refreshToken) => {
  await Token.destroy({ where: { refreshToken } });
  return true;
};

module.exports = {
  signOut,
};
