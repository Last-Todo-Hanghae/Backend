const { User } = require("../models"); // 모델 가져오기
const { Op } = require("sequelize"); // Sequlize Operation 연산 사용을 위해 추가

class UserRepository {
	// User 테이블을 userName로 조회
	getUserByName = async (userName) => {
		const user = await User.findOne({ where: { userName } });
		return user;
	};

	// User 테이블을 userId로 조회
	getUserById = async (userId) => {
		const user = await User.findOne({ where: { userId } });
		return user;
	};

	// User 테이블에 회원정보 저장
	postUser = async (userName, userPassword) => {
		const user = await User.create({ userName, userPassword });
		return user;
	};
	
	// User 테이블에 새로운 비밀번호로 변경
	putUser = async (userName, userPassword, newPassword) => {
		const user = await User.update(
			{ userPassword: newPassword },
			{ where: { [Op.and]: [{ userName }, { userPassword }]	}	}
		);
		return user;
	};
}

module.exports = UserRepository;