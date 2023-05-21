const CustomError = require("../utils/error.utils");
const yourtodoRepository = require("../repositories/yourtodo.repository");

// yourtodo 전체 리스트 조회
const yourtodoGet = async (source) => {
  const yourtodo = await yourtodoRepository.yourtodoGet(source);
  return yourtodo;
};

// yourtodo 상세 조회
const yourtodoGetDetail = async (source, userId) => {
  // User 존재 여부 확인
  const userCheck = await yourtodoRepository.findUser(userId);

  // 유효성 검사
  if (!userCheck) {
    throw new CustomError("해당 유저를 찾을 수 없습니다.", 404);
  }

  // yourtodo 테이블 조회
  const yourTodo = await yourtodoRepository.yourtodoGetDetail(userId);
  const isLike = await yourtodoRepository.yourtodoGetLike(source, userId);

  return { 
    userName: yourTodo[0].dataValues.userName,
    userImage: yourTodo[0].dataValues.UserInfo.dataValues.userImage ? yourTodo[0].dataValues.UserInfo.dataValues.userImage : null,
    isLike: isLike[0] !== undefined ? isLike[0].dataValues.isLike : false,
    mytodo: yourTodo[0].dataValues.Todos,
  };
};

// yourtodo 좋아요 상태 수정
const yourtodoPutLike = async (source, target) => {
  // User 존재 여부 확인
  const userCheck = await yourtodoRepository.findUser(source);

  // 유효성 검사
  if (!userCheck) {
    throw new CustomError("해당 유저를 찾을 수 없습니다.", 404);
  }

  // isLike 상태 조회 및 값이 존재하지 않는다면 기본값으로 생성
  const like = await yourtodoRepository.checkIsLike(source, target);

  // isLike 상태 변경
  await yourtodoRepository.yourtodoPutLike(!like[0].dataValues.isLike, source, target);
  return true;
};

module.exports = {
  yourtodoGet,
  yourtodoGetDetail,
  yourtodoPutLike,
};
