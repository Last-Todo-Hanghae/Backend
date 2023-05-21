// 모델 가져오기
const { Todo, User, UserInfo } = require("../models");

// util 추가
// const { parseModelToFlatObject } = require('../utils/sequelize.helper');

// mytodo 작성
const mytodoPost = async ( userId, todoContent, todoPriority ) => {
  const myTodo = await Todo.create({
    userId,
    todoContent,
    todoIsDone: false,
    todoPriority,
  });
  return myTodo;
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
  return todoAll;
};

// mytodo list 존재 여부 확인
const findMyTodo = async (todoId) => {
  const mytodo = await Todo.findOne({ where: { todoId } });
  return mytodo;
};

// mytodo 중요도 수정
const mytodoPutPriority = async (todoId, todoPriority) => {
  await Todo.update({ todoPriority }, { where: { todoId } });
  return true;
};

// mytodo 내용 수정
const mytodoPutContent = async (todoId, todoContent) => {
  await Todo.update({ todoContent }, { where: { todoId } });
  return true;
};

// mytodo 완료 여부 수정
const mytodoPutIsDone = async (todoIsDone, todoId) => {
  await Todo.update( { todoIsDone }, { where: { todoId } });
  return true;
};

// mytodo 삭제
const mytodoDelete = async (todoId) => {
  await Todo.destroy({ where: { todoId } });
  return true;
};

module.exports = {
  mytodoPost,
  mytodoGet,
  findMyTodo,
  mytodoPutPriority,
  mytodoPutContent,
  mytodoPutIsDone,
  mytodoDelete,
};
