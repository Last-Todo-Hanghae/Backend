const CustomError = require("../utils/error.utils");
// 모델 가져오기
const { Token } = require("../models");

// 로그아웃 API
const signOut = async (userId) => {
  await Token.destroy({ where: { refreshToken: userId } });
  return true;
};

module.exports = {
  signOut,
};
