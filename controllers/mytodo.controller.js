const mytodoService = require("../services/mytodo.service");

// mytodo 작성
const mytodoPost = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { userName } = res.locals.user;
    const { todoContent, todoStatus, todoPriority } = req.body;

    // 입력값 유효성 검사
    if (
      !userId ||
      !userName ||
      !todoContent ||
      todoStatus === undefined ||
      !todoPriority
    ) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    const result = await mytodoService.mytodoPost(
      userId,
      userName,
      todoContent,
      todoStatus,
      todoPriority
    );

    return res.status(201).json({
      userName: result.userName,
      todoId: result.todoId,
      todoContent: result.todoContent,
      todoStatus: result.todoStatus,
      todoPriority: result.todoPriority,
    });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 추가에 실패했습니다.",
    });
  }
};

// mytodo 전체 조회
const mytodoGet = async (req, res) => {
  try {
    const { userId } = res.locals.user;

    // 입력값 유효성 검사
    if (!userId) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    const todoAll = await mytodoService.mytodoGet(userId);

    return res.status(200).json({
      todoAll,
    });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 추가에 실패했습니다.",
    });
  }
};

// mytodo 중요도 수정
const mytodoPutPriority = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { todoId } = req.params;
    const { todoPriority } = req.body;

    // 입력값 유효성 검사
    if (!userId || !todoId || !todoPriority) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    await mytodoService.mytodoPutPriority(userId, todoId, todoPriority);

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 중요도 변경에 실패했습니다.",
    });
  }
};

// mytodo 내용 수정
const mytodoPutContent = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { todoId } = req.params;
    const { todoContent } = req.body;

    // 입력값 유효성 검사
    if (!userId || !todoId || !todoContent) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    await mytodoService.mytodoPutContent(userId, todoId, todoContent);

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 내용 변경에 실패했습니다.",
    });
  }
};

const mytodoPutIsDone = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { todoId } = req.params;

    // 입력값 유효성 검사
    if (!userId || !todoId) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    await mytodoService.mytodoPutIsDone(userId, todoId);

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 내용 변경에 실패했습니다.",
    });
  }
};

// mytodo 삭제
const mytodoDelete = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { todoId } = req.params;

    await mytodoService.mytodoDelete(userId, todoId);

    return res.status(201).json({});
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
