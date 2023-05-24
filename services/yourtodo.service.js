const CustomError = require("../utils/error.utils");
const JoinRepository = require("../repositories/join.repository");
const LikeRepository = require("../repositories/like.repository");

class YourtodoService {
  joinRepository = new JoinRepository();
  likeRepository = new LikeRepository();

  // yourtodo 전체 리스트 조회
  yourtodoGet = async (source) => {
    const yourtodo = await this.joinRepository.getYourtodo(source);
    return yourtodo;
  };

  // yourtodo 상세 조회
  yourtodoGetDetail = async (source, userId) => {
    // User 존재 여부 확인
    const yourTodo = await this.joinRepository.getYourtodoDetail(userId);

    // 유효성 검사
    if (!yourTodo) {
      throw new CustomError("해당 유저를 찾을 수 없습니다.", 404);
    }

    // Like 테이블 조회
    const like = await this.likeRepository.getLike(source, userId);

    return { 
      userName: yourTodo[0].dataValues.userName,
      userImage: yourTodo[0].dataValues.UserInfo.dataValues.userImage ? yourTodo[0].dataValues.UserInfo.dataValues.userImage : null,
      isLike: like[0] !== undefined ? like[0].dataValues.isLike : false,
      mytodo: yourTodo[0].dataValues.Todos,
    };
  };

  // yourtodo 좋아요 상태 수정
  yourtodoPutLike = async (source, target) => {
    // User 존재 여부 확인
    const yourTodo = await this.joinRepository.getYourtodoDetail(target);

    // 유효성 검사
    if (!yourTodo) {
      throw new CustomError("해당 유저를 찾을 수 없습니다.", 404);
    }

    // isLike 상태 조회 및 값이 존재하지 않는다면 기본값으로 생성
    const like = await this.likeRepository.getOrPostLike(source, target);

    // isLike 상태 변경
    await this.likeRepository.putLike(!like[0].dataValues.isLike, source, target);
    return true;
  };
}

module.exports = YourtodoService;
