// Sequlize Operation 연산 사용을 위해 추가
const { Op } = require("sequelize");

// 모델 가져오기
const { Todo, User, UserInfo, Like } = require("../models");

// yourtodo 전체 리스트 조회 API
const yourtodoGet = async (source) => {
  const yourtodo = await User.findAll({
    attributes: ["userName"],
    include: [
      {
        model: UserInfo,
        required: true,
        attributes: ["userImage"],
      },
      {
        model: Like,
        required: false,
        attributes: ["isLike", "updatedAt"],
        where: { sourceUserId: source },
      },
      {
        model: Todo,
        required: false,
        attributes: ["todoId", "todoContent", "todoIsDone", "updatedAt"],
        order: [
          ["todoIsDone", "ASC"],
          ["updatedAt", "DESC"],
        ],
        limit: 3,
      },
    ],
    order: [
      [ Like, "updatedAt", "DESC"],
    ],
  })

  return yourtodo;
};

// User 존재 여부 확인
const findUser = async (userId) => {
	const userCheck = await User.findOne({ where: { userId } });
	return userCheck;
}

// yourtodo 상세 조회
const yourtodoGetDetail = async (userId) => {
  const yourTodo = await User.findAll({
    attributes: ["userName"],
    where: { userId },
    include: [
      {
        model: UserInfo,
        required: true,
        attributes: ["userImage"],
      },
      {
        model: Todo,
        required: false,
        attributes: ["todoId", "todoContent", "todoIsDone", "todoPriority"],
      },
    ],
    order: [
      [Todo, "todoIsDone", "ASC"],
      [Todo, "updatedAt", "DESC"],
    ],
  });

  return yourTodo;
};

const yourtodoGetLike = async (source, userId) => {
  const isLike = await Like.findAll({
    attributes: ["isLike"],
    where: {
      [Op.and]: [
        { sourceUserId: source },
        { targetUserId: userId }
      ]
    }
  });

  return isLike;
};

// isLike 상태 조회 및 값이 존재하지 않는다면 기본값으로 생성
const checkIsLike = async (source, target) => {
  const islike = await Like.findOrCreate({
    where: { sourceUserId: source, targetUserId: target },
    defaults: {
      sourceUserId: source,
      targetUserId: Number(target),
      isLike: false,
    },
  });

  return islike;
};

// yourtodo 좋아요 상태 수정 API
const yourtodoPutLike = async (isLike, source, target) => {
  await Like.update(
    { isLike },
    {
      where: {
        [Op.and]: [{ sourceUserId: source }, { targetUserId: target }],
      },
    }
  );
  return true;
};

module.exports = {
  yourtodoGet,
	findUser,
  yourtodoGetDetail,
	yourtodoGetLike,
	checkIsLike,
  yourtodoPutLike,
};
