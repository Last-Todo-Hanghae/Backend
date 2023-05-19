// 모델 가져오기
const { Todo, User, UserInfo } = require("../models");

// mytodo 작성
const mytodoPost = async (
  userId,
  userName,
  todoContent,
  todoStatus,
  todoPriority
) => {
  try {
    const myTodo = await Todo.create({
      userId,
      todoContent,
      todoStatus,
      todoPriority,
    });
    return {
      userName,
      todoId: myTodo.todoId,
      todoContent: myTodo.todoContent,
      todoStatus: myTodo.todoStatus,
      todoPriority: myTodo.todoPriority,
    };
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 추가에 실패했습니다.",
    });
  }
};

// mytodo 전체 조회
const mytodoGet = async (userId) => {
  try {
    const todoAll = await Todo.findAll({
      attributes: [
        "todoId",
        "todoContent",
        "todoStatus",
        "todoPriority",
        "updatedAt",
      ],
      where: { userId },
      include: [
        {
          model: User,
          required: true,
          attributes: ["userName"],
          include: [
            {
              model: UserInfo,
              required: true,
              attributes: ["userImage"],
            },
          ],
        },
      ],
      order: [
        ["todoStatus", "ASC"],
        ["updatedAt", "DESC"],
      ],
    });
    return todoAll;
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 조회에 실패했습니다.",
    });
  }
};

// mytodo 중요도 수정 API
const mytodoPutPriority = async (userId, todoId, todoPriority) => {
  try {
    // mytodo list 존재 여부 확인
    const mytodo = await Todo.findOne({ where: { todoId } });

    if (!mytodo) {
      return res.status(404).json({
        message: "해당 Todo 리스트를 찾을 수 없습니다.",
      });
    } else if (mytodo.userId !== userId) {
      return res.status(401).json({
        message: "로그인 후 이용 가능한 기능입니다.",
      });
    }

    // 우선순위 변경
    await Todo.update({ todoPriority }, { where: { todoId } });

    return true;
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 중요도 변경에 실패했습니다.",
    });
  }
};

// mytodo 내용 수정
const mytodoPutContent = async (userId, todoId, todoContent) => {
  try {
    // mytodo list 존재 여부 확인
    const mytodo = await Todo.findOne({ where: { todoId } });

    if (!mytodo) {
      return res.status(404).json({
        message: "해당 Todo 리스트를 찾을 수 없습니다.",
      });
    } else if (mytodo.userId !== userId) {
      return res.status(401).json({
        message: "로그인 후 이용 가능한 기능입니다.",
      });
    }

    // 내용 변경
    await Todo.update({ todoContent }, { where: { todoId } });

    return true;
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 내용 변경에 실패했습니다.",
    });
  }
};

// mytodo 완료 여부 수정 API
const mytodoPutIsDone = async (userId, todoId) => {
  try {
    // mytodo list 존재 여부 확인
    const mytodo = await Todo.findOne({ where: { todoId } });

    if (!mytodo) {
      return res.status(404).json({
        message: "해당 Todo 리스트를 찾을 수 없습니다.",
      });
    } else if (mytodo.userId !== userId) {
      return res.status(401).json({
        message: "로그인 후 이용 가능한 기능입니다.",
      });
    }

    // todo 상태 변경
    await Todo.update(
      { todoStatus: !mytodo.todoStatus },
      { where: { todoId } }
    );

    return true;
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 완료 여부 변경에 실패했습니다.",
    });
  }
};

// mytodo 삭제
const mytodoDelete = async (userId, todoId) => {
  try {
    // mytodo list 존재 여부 확인
    const mytodo = await Todo.findOne({ where: { todoId } });

    if (!mytodo) {
      return res.status(404).json({
        message: "해당 Todo 리스트를 찾을 수 없습니다.",
      });
    } else if (mytodo.userId !== userId) {
      return res.status(401).json({
        message: "로그인 후 이용 가능한 기능입니다.",
      });
    }

    // 게시글 내용 삭제
    await Todo.destroy({ where: { todoId } });

    return true;
  } catch (error) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 삭제에 실패했습니다.",
    });
  }
};

module.exports = {
  mytodoPost,
  mytodoGet,
  mytodoPutPriority,
  mytodoPutContent,
  mytodoPutIsDone,
  mytodoDelete,
};
