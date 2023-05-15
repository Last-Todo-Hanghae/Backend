const express = require("express");
const router = express.Router();

// 모델 가져오기
const { Todo, User, UserInfo } = require("../models");

// 인증을 위한 미들웨어 가져오기
const authMiddleware = require("../middlewares/auth-middleware");

// mytodo 작성 API
router.post("/mytodo", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { userName } = res.locals.user;
    const { todoContent, todoStatus, todoPriority } = req.body;

    const myTodo = await Todo.create({ userId, todoContent, todoStatus, todoPriority });
    return res.status(201).json({ 
			userName,
			todoId: myTodo.todoId,
			todoContent: myTodo.todoContent,
			todoStatus: myTodo.todoStatus,
			todoPriority: myTodo.todoPriority
		});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 추가에 실패했습니다."
    })
  }
});

// mytodo 전체 조회 API
router.get("/mytodo", async (req, res) => {
  try {
    const todoAll = await Todo.findAll({
      attributes: ["todoId", "todoContent", "todoStatus", "todoPriority", "updatedAt"],
      include: [
        {
          model: User,
          required: true,
          attributes: ['userName'],
          include: [
            {
              model: UserInfo,
              required: true,
              attributes: ['userImage']
            }
          ]
        }
      ],
      order: [
        ['todoStatus', 'ASC'],
        ['updatedAt', 'DESC']
      ]
    });
    return res.status(200).json({ todoAll });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 조회에 실패했습니다."
    })
  }
});

// mytodo 중요도 수정 API
router.put("/mytodo/:todoId/priority", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { todoId } = req.params;
    const { todoPriority } = req.body;

    // mytodo list 존재 여부 확인
    const mytodo = await Todo.findOne({ where: { todoId } });

    if (!mytodo) {
      return res.status(404).json({
        message: "해당 Todo 리스트를 찾을 수 없습니다."
      });
    } else if (mytodo.userId !== userId) {
      return res.status(401).json({ 
        message: "로그인 후 이용 가능한 기능입니다."
      });
    };

    // 우선순위 변경
    const todoChanged = await Todo.update({ todoPriority }, { where: { todoId } });

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 중요도 변경에 실패했습니다."
    })
  }
});

// mytodo 내용 수정 API
router.put("/mytodo/:todoId/content", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { todoId } = req.params;
    const { todoContent } = req.body;

    // mytodo list 존재 여부 확인
    const mytodo = await Todo.findOne({ where: { todoId } });

    if (!mytodo) {
      return res.status(404).json({
        message: "해당 Todo 리스트를 찾을 수 없습니다."
      });
    } else if (mytodo.userId !== userId) {
      return res.status(401).json({ 
        message: "로그인 후 이용 가능한 기능입니다."
      });
    };

    // 내용 변경
    const todoChanged = await Todo.update({ todoContent }, { where: { todoId } });

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 내용 변경에 실패했습니다."
    })
  }
});

// mytodo 완료 여부 수정 API
router.put("/mytodo/:todoId/isdone", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { todoId } = req.params;
    let todoStatus;

    // mytodo list 존재 여부 확인
    const mytodo = await Todo.findOne({ where: { todoId } });

    if (!mytodo) {
      return res.status(404).json({
        message: "해당 Todo 리스트를 찾을 수 없습니다."
      });
    } else if (mytodo.userId !== userId) {
      return res.status(401).json({ 
        message: "로그인 후 이용 가능한 기능입니다."
      });
    };

    if (mytodo.todoStatus === true) {
      todoStatus = false;
    } else {
      todoStatus = true;
    };

    // 내용 변경
    const todoChanged = await Todo.update({ todoStatus }, { where: { todoId } });

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 내용 변경에 실패했습니다."
    })
  }
});

// mytodo 삭제 API
router.delete("/mytodo/:todoId", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { todoId } = req.params;

    // mytodo list 존재 여부 확인
    const mytodo = await Todo.findOne({ where: { todoId } });

    if (!mytodo) {
      return res.status(404).json({
        message: "해당 Todo 리스트를 찾을 수 없습니다.",
      });
    } else if (mytodo.userId !== userId) {
      return res.status(401).json({ 
        message: "로그인 후 이용 가능한 기능입니다." 
      });
    };

    // 게시글 내용 삭제
    const deleteTodo = await Todo.destroy({ where: { todoId } });

    return res.status(201).json({});
  } catch (error) {
    console.log(err);
    res.status(403).send({
      message: "mytodo 리스트 삭제에 실패했습니다."
    })
  }
});

module.exports = router;