const CustomError = require("../utils/error.utils");
const signoutRepository = require("../repositories/signout.repository");

// 로그아웃 API
const signOut = async (refreshToken) => {
  await signoutRepository.signOut(refreshToken);
  return true;
};

module.exports = {
  signOut,
};
