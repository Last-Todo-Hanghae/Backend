const express = require("express");
const router = express.Router();

// Sequlize Operation 연산 사용을 위해 추가
const { Op } = require("sequelize");

// 모델 가져오기
const { Todo, User, UserInfo, Like } = require("../models");

// 인증을 위한 미들웨어 가져오기
const authMiddleware = require("../middlewares/auth-middleware");

// yourtodo 전체 리스트 조회 API
router.get("/yourtodo", authMiddleware, async (req, res) => {
  try {
    const UserAll = await User.findAll({
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
          attributes: ["todoId", "todoContent", "todoStatus", "updatedAt"],
          order: [
            ["todoStatus", "ASC"],
            ["updatedAt", "DESC"],
          ],
          limit: 3,
        },
        {
          model: Like,
          required: false,
          attributes: ["isLike"],
        },
      ],
      order: [[Like, "updatedAt", "DESC"]],
    });
    return res.status(200).json({ UserAll });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "yourtodo 리스트 조회에 실패했습니다.",
    });
  }
});

router.get("/yourtodo/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

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
          attributes: ["todoId", "todoContent", "todoStatus", "todoPriority"],
          order: [
            ["todoStatus", "ASC"],
            ["updatedAt", "DESC"],
          ],
        },
        {
          model: Like,
          required: false,
          attributes: ["isLike"],
        },
      ],
    });
    return res.status(200).json({ yourTodo });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 조회에 실패했습니다.",
    });
  }
});

// yourtodo 좋아요 상태 수정 API
router.put("/yourtodo/:userId/like", authMiddleware, async (req, res) => {
  try {
    const source = res.locals.user["dataValues"]["userId"];
    const target = req.params.userId;
    let likeStatus;

    // User 존재 여부 확인
    const userCheck = await User.findOne({ where: { userId: Number(target) } });

    if (!userCheck) {
      return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    }

    // isLike 상태 조회 및 값이 존재하지 않는다면 기본값으로 생성
    const like = await Like.findOrCreate({
      where: { sourceUserId: source, targetUserId: Number(target) },
      defaults: {
        sourceUserId: source,
        targetUserId: Number(target),
        isLike: false,
      },
    });

    // like 상태 변경
    const checkIsLike = like[0]["dataValues"]["isLike"];
    if (checkIsLike === false) {
      likeStatus = true;
    } else {
      likeStatus = false;
    }

    // isLike 상태 변경
    await Like.update(
      {
        isLike: likeStatus,
      },
      {
        where: {
          [Op.and]: [
            { sourceUserId: source },
            { targetUserId: Number(target) },
          ],
        },
      }
    );

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "yourtodo 좋아요 상태 변경에 실패했습니다.",
    });
  }
});

module.exports = router;
