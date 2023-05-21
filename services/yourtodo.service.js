const CustomError = require("../utils/error.utils");
// Sequlize Operation 연산 사용을 위해 추가
const { Op } = require("sequelize");

// util 추가
const { parseModelToFlatObject } = require('../utils/sequelize.helper');

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

// yourtodo 상세 조회 API
const yourtodoGetDetail = async (source, userId) => {
  // User 존재 여부 확인
  const userCheck = await User.findOne({ where: { userId } });

  if (!userCheck) {
    throw new CustomError("해당 유저를 찾을 수 없습니다.", 404);
  }

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

  const isLike = await Like.findAll({
    attributes: ["isLike"],
    where: {
      [Op.and]: [
        { sourceUserId: source },
        { targetUserId: userId }
      ]
    }
  });

  return { 
    userName: yourTodo[0].dataValues.userName,
    userImage: yourTodo[0].dataValues.UserInfo.dataValues.userImage ? yourTodo[0].dataValues.UserInfo.dataValues.userImage : null,
    isLike: isLike[0] !== undefined ? isLike[0].dataValues.isLike : false,
    mytodo: yourTodo[0].dataValues.Todos,
  };
};

// yourtodo 좋아요 상태 수정 API
const yourtodoPutLike = async (source, target) => {
  // User 존재 여부 확인
  const userCheck = await User.findOne({ where: { userId: target } });

  if (!userCheck) {
    throw new CustomError("해당 유저를 찾을 수 없습니다.", 404);
  }

  // isLike 상태 조회 및 값이 존재하지 않는다면 기본값으로 생성
  const like = await Like.findOrCreate({
    where: { sourceUserId: source, targetUserId: target },
    defaults: {
      sourceUserId: source,
      targetUserId: Number(target),
      isLike: false,
    },
  });

  // like 상태 조회
  const likeStatus = like[0]["dataValues"]["isLike"];

  // isLike 상태 변경
  await Like.update(
    {
      isLike: !likeStatus,
    },
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
  yourtodoGetDetail,
  yourtodoPutLike,
};
