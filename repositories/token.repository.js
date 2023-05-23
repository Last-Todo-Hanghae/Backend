const { Token } = require("../models"); // 모델 가져오기

class TokenRepository {
	// refresh 토큰 조회
	getToken = async (refreshToken) => {
		const token = await Token.findAll({
			attributes: ["refreshToken"], where: { refreshToken },
		});
		return token;
	};

	// refresh 토큰 생성
	postToken = async (refreshToken) => {
		const token = await Token.create({ refreshToken });
		return token;
	};

	// refresh 토큰 삭제
	deleteToken = async (refreshToken) => {
		const token = await Token.destroy({ where: { refreshToken } });
		return token;
	};
}

module.exports = TokenRepository;