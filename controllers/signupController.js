const userService = require("../services/userService");
const userInfoService = require("../services/userInfoService");

const signUp = async (req, res) => {
	try {
		const { userName, userPassword } = req.body;
		// 입력값 유효성 검사
		if( !userName || !userPassword ) {
			return res.status(400).json({ message: "입력 정보가 올바르지 않습니다." });
		}
		const userId = await userService.signUp(userName, userPassword);
		await userInfoService.signUp(userId);
	
		return res.status(201).json({});
	} catch (err) {
		console.log(err);
		res.status(403).send({
			message: "회원가입에 실패했습니다.",
		});
	}
};

module.exports = {
	signUp
}