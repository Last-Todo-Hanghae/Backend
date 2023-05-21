// Sequlize Operation 연산 사용을 위해 추가
const { Op } = require("sequelize");

// 모델 가져오기
const { User } = require("../models");

// User 테이블에서 userName 조회
const findUser = async (userName) => {
	const findUser = await User.findOne({ where: { userName } });
	return findUser;
};

// 비밀번호 변경
const pwChange = async (userName, userPassword, newPassword) => {
  await User.update(
    { userPassword: newPassword },
    {
      where: {
        [Op.and]: [
					{ userName }, 
					{ userPassword }
				],
      },
    }
  );
  return true;
};

// 유저 정보 조회(userName)
const getUserInfo = async (userId) => {
	const { userName } = await User.findOne({ where: { userId } });
	return userName;
};

module.exports = {
  findUser, pwChange, getUserInfo
};
