// Sequlize Operation 연산 사용을 위해 추가
const { Op } = require("sequelize");

// 모델 가져오기
const { Todo, User, UserInfo, Like } = require("../models");

// yourtodo 전체 리스트 조회 API
const yourtodoGet = async (source) => {
  try {
    const yourtodo = await User.findAll({
      attributes: ["userName"],
      include: [
        {
          model: UserInfo,
          required: true,
          attributes: ["userImage"],
        },
        {
          model: Todo,
          required: true,
          attributes: ["todoId", "todoContent", "todoIsDone", "updatedAt"],
          order: [
            ["todoIsDone", "ASC"],
            ["updatedAt", "DESC"],
          ],
          limit: 3,
        },
        {
          model: Like,
          required: false,
          attributes: ["isLike"],
          where: { sourceUserId: source },
        },
      ],
      order: [
        [Like, "updatedAt", "DESC"],
      ],
    });

    

    // let likeValue;
    // if (yourtodo[0].dataValues.Likes.dataValues) {
    //   likeValue = yourtodo[0].dataValues.Likes.dataValues.isLike;
    // } else {
    //   likeValue = []
    // };

    return {
      yourtodo
    };
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "yourtodo 리스트 조회에 실패했습니다.",
    });
  }
};

const yourtodoGetDetail = async (source, userId) => {
  try {
    // User 존재 여부 확인
    const userCheck = await User.findOne({ where: { userId } });

    if (!userCheck) {
      return res.status(404).json({
        message: "해당 유저를 찾을 수 없습니다.",
      });
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
          required: true,
          attributes: ["todoId", "todoContent", "todoIsDone", "todoPriority"],
          order: [
            ["todoIsDone", "ASC"],
            ["updatedAt", "DESC"],
          ],
        },
        {
          model: Like,
          required: false,
          attributes: ["isLike"],
          where: { sourceUserId: source },
        },
      ],
    });
    return yourTodo;
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "yourtodo 상세 조회에 실패했습니다.",
    });
  }
};

// yourtodo 좋아요 상태 수정 API
const yourtodoPutLike = async (source, target) => {
  try {
    // User 존재 여부 확인
    const userCheck = await User.findOne({ where: { userId: target } });

    if (!userCheck) {
      return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
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
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "yourtodo 좋아요 상태 변경에 실패했습니다.",
    });
  }
};

module.exports = {
  yourtodoGet,
  yourtodoGetDetail,
  yourtodoPutLike,
};
