const { Like } = require("../models"); // 모델 가져오기
const { Op } = require("sequelize"); // Sequlize Operation 연산 사용을 위해 추가

class LikeRepository {
	// Like 테이블에서 isLike 정보 조회
	getLike = async (sourceUserId, targetUserId) => {
		const like = await Like.findAll({
			attributes: ["isLike"],
			where: { [Op.and]: [{ sourceUserId },{ targetUserId }] }
		});
		return like;
	};

	// Like 테이블에서 isLike 정보 조회, 값이 존재하지 않는다면 기본값으로 생성
	getOrPostLike = async (sourceUserId, targetUserId) => {
		const like = await Like.findOrCreate({
			where: { sourceUserId, targetUserId },
			defaults: {
				sourceUserId: sourceUserId,
				targetUserId: targetUserId,
				isLike: false,
			},
		});
		return like;
	};

	// yourtodo 좋아요 상태 수정 API
	putLike = async (isLike, sourceUserId, targetUserId) => {
		const like = await Like.update(
			{ isLike },
			{	where: { [Op.and]: [{ sourceUserId }, { targetUserId }]	}	}
		);
		return like;
	};
}

module.exports = LikeRepository;