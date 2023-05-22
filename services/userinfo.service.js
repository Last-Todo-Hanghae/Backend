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
  /* REVIEW: 
    주고싶은 데이터가 없다면 안주셔도 됩니다!
    현재는 return 값이 Promise<{}>지만
    Promise<void>로 바꾸어도 될 것 같네요:)
   */
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
