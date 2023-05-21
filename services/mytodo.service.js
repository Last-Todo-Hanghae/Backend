const CustomError = require("../utils/error.utils");

// 모델 가져오기
const { Todo, User, UserInfo, sequelize } = require("../models");

// util 추가
const { parseModelToFlatObject } = require('../utils/sequelize.helper');

// mytodo 작성
const mytodoPost = async ( userId, userName, todoContent, todoPriority ) => {
  const myTodo = await Todo.create({
    userId,
    todoContent,
    todoIsDone: false,
    todoPriority,
  });
  return {
    userName,
    todoId: myTodo.todoId,
    todoContent: myTodo.todoContent,
    todoIsDone: myTodo.todoIsDone,
    todoPriority: myTodo.todoPriority,
  };
};

// mytodo 전체 조회
const mytodoGet = async (userId) => {
  const todoAll = await User.findAll({
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
      [ Todo, "todoIsDone", "ASC" ],
      [ Todo, "updatedAt", "DESC" ],
    ],
    // raw: true, // JSON 형태로 반환
  })

  return { 
    userName: todoAll[0].dataValues.userName,
    userImage: todoAll[0].dataValues.UserInfo.dataValues.userImage,
    mytodo: todoAll[0].dataValues.Todos,
  };
};

// mytodo 중요도 수정 API
const mytodoPutPriority = async (userId, todoId, todoPriority) => {
  // mytodo list 존재 여부 확인
  const mytodo = await Todo.findOne({ where: { todoId } });

  if (!mytodo || mytodo.userId !== userId) {
    throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
  }

  // 우선순위 변경
  await Todo.update({ todoPriority }, { where: { todoId } });

  return true;
};

// mytodo 내용 수정
const mytodoPutContent = async (userId, todoId, todoContent) => {
  // mytodo list 존재 여부 확인
  const mytodo = await Todo.findOne({ where: { todoId } });

  if (!mytodo || mytodo.userId !== userId) {
    throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
  }

  // 내용 변경
  await Todo.update({ todoContent }, { where: { todoId } });

  return true;
};

// mytodo 완료 여부 수정 API
const mytodoPutIsDone = async (userId, todoId) => {
  // mytodo list 존재 여부 확인
  const mytodo = await Todo.findOne({ where: { todoId } });

  if (!mytodo || mytodo.userId !== userId) {
    throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
  }

  // todo 상태 변경
  await Todo.update(
    { todoIsDone: !mytodo.todoIsDone },
    { where: { todoId } }
  );

  return true;
};

// mytodo 삭제
const mytodoDelete = async (userId, todoId) => {
  // mytodo list 존재 여부 확인
  const mytodo = await Todo.findOne({ where: { todoId } });

  if (!mytodo || mytodo.userId !== userId) {
    throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
  }

  // 게시글 내용 삭제
  await Todo.destroy({ where: { todoId } });

  return true;
};

module.exports = {
  mytodoPost,
  mytodoGet,
  mytodoPutPriority,
  mytodoPutContent,
  mytodoPutIsDone,
  mytodoDelete,
};
