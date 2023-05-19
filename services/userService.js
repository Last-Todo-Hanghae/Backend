const { User } = require("../models");

const signUp = async (userName, userPassword) => {
	try {
		// userName이 동일한 데이터가 있는지 확인
		const existsUser = await User.findOne({ where: { userName } });
		if (existsUser) {
			return res.status(401).json({
				message: "중복된 닉네임 입니다.",
			});
		}
		// User 테이블에 회원정보 저장
		const createUser = await User.create({ userName, userPassword });
		return createUser.userId;
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

// // 아이디 유효성, 비밀번호 유효성, 비밀번호 확인 로직
// const { userName, userPassword, confirmPassword } = req.body;

// // 아이디 유효성 검사
// const idRegex = /^[a-zA-Z0-9]{3,}$/;
// if (!idRegex.test(userName)) {
//   return res.status(402).json({
//     message: "아이디 유효성 검사 실패"
//   });
// }

// // 패스워드 유효성 검사
// const pwRegex = new RegExp(`^((?!${userName}).){4,}$`);
// if (!pwRegex.test(userPassword)) {
//   return res.status(402).json({
//     message: "패스워드 유효성 검사 실패"
//   });
// }

// // 패스워드와 패스워드 확인 비교
// if (userPassword !== confirmPassword) {
//   return res.status(402).json({
//     message: "패스워드가 패스워드 확인란과 다릅니다."
//   });
// }