const { UserInfo } = require("../models");

const signUp = async ( userId ) => {
	try {
		// 유저 정보 테이블에 회원정보 저장
		const createUserinfo = await UserInfo.create({ userId });
	
		return createUserinfo;
	} catch (err) {
		console.log(err);
		res.status(403).send({
			message: "회원가입에 실패했습니다.",
		});
	}
}

module.exports = {
	signUp
}