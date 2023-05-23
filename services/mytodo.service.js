const CustomError = require("../utils/error.utils");
const JoinRepository = require("../repositories/join.repository");
const TodoRepository = require("../repositories/todo.repository");

class MytodoService {
  joinRepository = new JoinRepository();
  todoRepository = new TodoRepository();

  // mytodo 작성
  mytodoPost = async ( userId, userName, todoContent, todoPriority ) => {
    const myTodo = await this.todoRepository.postTodo( userId, todoContent, todoPriority );
    return {
      userName,
      todoId: myTodo.todoId,
      todoContent: myTodo.todoContent,
      todoIsDone: myTodo.todoIsDone,
      todoPriority: myTodo.todoPriority,
    };
  };

  // mytodo 전체 조회
  mytodoGet = async (userId) => {
    const todoAll = await this.joinRepository.getMytodo(userId);
    return { 
      userName: todoAll[0].dataValues.userName,
      userImage: todoAll[0].dataValues.UserInfo.dataValues.userImage,
      mytodo: todoAll[0].dataValues.Todos,
    };
  };

  // mytodo 중요도 수정 API
  mytodoPutPriority = async (userId, todoId, todoPriority) => {
    // mytodo list 존재 여부 확인
    const mytodo = await this.todoRepository.getTodo(todoId);

    // 유효성 검사
    if (!mytodo || mytodo.userId !== userId) {
      throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
    }

    // 우선순위 변경
    await this.todoRepository.putPriorityTodo(todoId, todoPriority)
    return true;
  };

  // mytodo 내용 수정
  mytodoPutContent = async (userId, todoId, todoContent) => {
    // mytodo list 존재 여부 확인
    const mytodo = await this.todoRepository.getTodo(todoId);

    // 유효성 검사
    if (!mytodo || mytodo.userId !== userId) {
      throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
    }

    // 내용 수정
    await this.todoRepository.putContentTodo(todoId,todoContent);
    return true;
  };

  // mytodo 완료 여부 수정 API
  mytodoPutIsDone = async (userId, todoId) => {
    // mytodo list 존재 여부 확인
    const mytodo = await this.todoRepository.getTodo(todoId);

    // 유효성 검사
    if (!mytodo || mytodo.userId !== userId) {
      throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
    }

    // todo 상태 변경
    await this.todoRepository.putIsDoneTodo(todoId,!mytodo.todoIsDone);
    return true;
  };

  // mytodo 삭제
  mytodoDelete = async (userId, todoId) => {
    // mytodo list 존재 여부 확인
    const mytodo = await this.todoRepository.getTodo(todoId);

    // 유효성 검사
    if (!mytodo || mytodo.userId !== userId) {
      throw new CustomError("해당 Todo 리스트를 찾을 수 없습니다.", 404);
    }

    // 게시글 내용 삭제
    await this.todoRepository.deleteTodo(todoId);
    return true;
  };
}

module.exports = MytodoService;
