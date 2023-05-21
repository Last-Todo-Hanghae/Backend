const CustomError = require("../utils/error.utils");
const userinfoRepository = require("../repositories/userinfo.repository");

// 비밀번호 변경 API
const pwChange = async (userName, userPassword, newPassword) => {
  const user = await userinfoRepository.findUser(userName);

  // 아이디 및 비밀번호 유효성 검사
  if (!user || userPassword !== user.userPassword) {
    throw new CustomError("비밀번호 또는 아이디가 일치하지 않습니다.", 401);
  }

  // 패스워드 변경
  await userinfoRepository.pwChange(userName, userPassword, newPassword);
  return {};
};

// 유저 정보 조회(userName)
const getUserInfo = async (userId) => {
  const findedUserName = await userinfoRepository.getUserInfo(userId);

  // 아이디 유효성 검사
  if (!findedUserName) {
    throw new CustomError("토큰 정보가 올바르지 않습니다.", 401);
  }

  return {
    userName: findedUserName
  };
};

module.exports = {
  pwChange, getUserInfo
};
