const { User, UserInfo } = require("../models");

// user 테이블에서 userName 조회
const findUser = async (userName) => {
	const findUser = await User.findOne({ where: { userName } });
	return findUser;
};
// User 테이블에 회원정보 저장
const createUser = async (userName, userPassword) => {
	const createUser = await User.create({ userName, userPassword });
	return createUser;
};
// 유저 정보 테이블에 회원정보 저장
const createUserinfo = async (userId) => {
	const createUserinfo = await UserInfo.create({ userId });
	return createUserinfo;
};

module.exports = {
  findUser, createUser, createUserinfo
};
