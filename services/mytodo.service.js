const CustomError = require("../utils/error.utils");
const mytodoRepository = require("../repositories/mytodo.repository");

// mytodo 작성
const mytodoPost = async ( userId, userName, todoContent, todoPriority ) => {
  const myTodo = await mytodoRepository.mytodoPost( userId, todoContent, todoPriority );
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
  const todoAll = await mytodoRepository.mytodoGet(userId);

  return { 
    userName: todoAll[0].dataValues.userName,
    userImage: todoAll[0].dataValues.UserInfo.dataValues.userImage,
    mytodo: todoAll[0].dataValues.Todos,
  };
};

// mytodo 중요도 수정 API
const mytodoPutPriority = async (userId, todoId, todoPriority) => {
  // mytodo list 존재 여부 확인
  const mytodo = await mytodoRepository.findMyTodo(todoId);

  // 유효성 검사
  if (!mytodo || mytodo.userId !== userId) {
    throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
  }

  // 우선순위 변경
  await mytodoRepository.mytodoPutPriority(todoId,todoPriority)
  return true;
};

// mytodo 내용 수정
const mytodoPutContent = async (userId, todoId, todoContent) => {
  // mytodo list 존재 여부 확인
  const mytodo = await mytodoRepository.findMyTodo(todoId);

  // 유효성 검사
  if (!mytodo || mytodo.userId !== userId) {
    throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
  }

  // 내용 수정
  await mytodoRepository.mytodoPutContent(todoId,todoContent);
  return true;
};

// mytodo 완료 여부 수정 API
const mytodoPutIsDone = async (userId, todoId) => {
  // mytodo list 존재 여부 확인
  const mytodo = await mytodoRepository.findMyTodo(todoId);

  // 유효성 검사
  if (!mytodo || mytodo.userId !== userId) {
    throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
  }

  // todo 상태 변경
  await mytodoRepository.mytodoPutIsDone(!mytodo.todoIsDone,todoId);
  return true;
};

// mytodo 삭제
const mytodoDelete = async (userId, todoId) => {
  // mytodo list 존재 여부 확인
  const mytodo = await mytodoRepository.findMyTodo(todoId);

  // 유효성 검사
  if (!mytodo || mytodo.userId !== userId) {
    throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
  }

  // 게시글 내용 삭제
  await mytodoRepository.mytodoDelete(todoId);
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
