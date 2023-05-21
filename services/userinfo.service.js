const CustomError = require("../utils/error.utils");
// 모델 가져오기
const { User } = require("../models");

// Sequlize Operation 연산 사용을 위해 추가
const { Op } = require("sequelize");

// 비밀번호 변경 API
const pwChange = async (userName, userPassword, newPassword) => {
  const user = await User.findOne({ where: { userName } });

  // 아이디 및 비밀번호 유효성 검사
  if (!user || userPassword !== user.userPassword) {
    throw new CustomError("비밀번호 또는 아이디가 일치하지 않습니다.", 401);
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
};

// 비밀번호 변경 API
const getUserInfo = async (userId) => {
  const user = await User.findOne({ where: { userId } });

  // 아이디 유효성 검사
  if (!user) {
    throw new CustomError("토큰 정보가 올바르지 않습니다.", 401);
  }

  return {
    userName: user.userName
  };
};

module.exports = {
  pwChange, getUserInfo
};
