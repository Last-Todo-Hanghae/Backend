const { Op } = require("sequelize"); // Sequlize Operation 연산 사용을 위해 추가
const { Todo, User, UserInfo, Like } = require("../models"); // 모델 가져오기

class JoinRepository {
  // mytodo 전체 조회
  getMytodo = async (userId) => {
    const todo = await User.findAll({
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
          attributes: [
            "todoId",
            "todoContent",
            "todoIsDone",
            "todoPriority",
            "updatedAt",
          ],
        },
      ],
      order: [
        [Todo, "todoIsDone", "ASC"],
        [Todo, "updatedAt", "DESC"],
      ],
    });
    return todo;
  };

  // yourtodo 전체 조회
  getYourtodo = async (sourceUserId) => {
    const todo = await User.findAll({
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
          where: { sourceUserId },
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
      order: [[Like, "updatedAt", "DESC"]],
    });
    return todo;
  };

  // yourtodo 상세 조회
  getYourtodoDetail = async (userId) => {
    const todo = await User.findAll({
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
    return todo;
  };
}

module.exports = JoinRepository;
