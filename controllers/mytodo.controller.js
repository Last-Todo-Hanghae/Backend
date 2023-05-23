const CustomError = require("../utils/error.utils");
const MytodoService = require("../services/mytodo.service");

class MytodoController {
  mytodoService = new MytodoService();

  // mytodo 작성
  mytodoPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { userName } = res.locals.user;
      const { todoContent, todoPriority } = req.body;

      // 입력값 유효성 검사
      if (
        !userId ||
        !userName ||
        !todoContent ||
        !todoPriority
      ) {
        throw new CustomError("입력값이 올바르지 않습니다.", 402);
      }

      const result = await this.mytodoService.mytodoPost(
        userId,
        userName,
        todoContent,
        todoPriority
      );

      return res.status(201).json({
        userName: result.userName,
        todoId: result.todoId,
        todoContent: result.todoContent,
        todoIsDone: result.todoIsDone,
        todoPriority: result.todoPriority,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        // 커스텀 에러에 따라 다른 상태 코드와 에러 메시지를 클라이언트에게 보냄
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "mytodo 리스트 추가에 실패했습니다.",
      });
    }
  };

  // mytodo 전체 조회
  mytodoGet = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;

      // 입력값 유효성 검사
      if (!userId) {
        throw new CustomError("토큰의 userId 정보가 유효하지 않습니다.", 402);
      }

      const { userName, userImage, mytodo } = await this.mytodoService.mytodoGet(userId);

      return res.status(200).json({
        userName, userImage, mytodo,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        // 커스텀 에러에 따라 다른 상태 코드와 에러 메시지를 클라이언트에게 보냄
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "mytodo 리스트 조회에 실패했습니다.",
      });
    }
  };

  // mytodo 중요도 수정
  mytodoPutPriority = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { todoId } = req.params;
      const { todoPriority } = req.body;

      // 입력값 유효성 검사
      if (!userId || !todoId || !todoPriority) {
        throw new CustomError("입력값이 올바르지 않습니다.", 402);
      }

      await this.mytodoService.mytodoPutPriority(userId, todoId, todoPriority);

      return res.status(201).json({});
    } catch (err) {
      if (err instanceof CustomError) {
        // 커스텀 에러에 따라 다른 상태 코드와 에러 메시지를 클라이언트에게 보냄
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "mytodo 중요도 변경에 실패했습니다.",
      });
    }
  };

  // mytodo 내용 수정
  mytodoPutContent = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { todoId } = req.params;
      const { todoContent } = req.body;

      // 입력값 유효성 검사
      if (!userId || !todoId || !todoContent) {
        throw new CustomError("입력값이 올바르지 않습니다.", 402);
      }

      await this.mytodoService.mytodoPutContent(userId, todoId, todoContent);

      return res.status(201).json({});
    } catch (err) {
      if (err instanceof CustomError) {
        // 커스텀 에러에 따라 다른 상태 코드와 에러 메시지를 클라이언트에게 보냄
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "mytodo 리스트 내용 변경에 실패했습니다.",
      });
    }
  };

  // mytodo 완료 여부 수정
  mytodoPutIsDone = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { todoId } = req.params;

      // 입력값 유효성 검사
      if (!userId || !todoId) {
        throw new CustomError("입력값이 올바르지 않습니다.", 402);
      }

      await this.mytodoService.mytodoPutIsDone(userId, todoId);

      return res.status(201).json({});
    } catch (err) {
      if (err instanceof CustomError) {
        // 커스텀 에러에 따라 다른 상태 코드와 에러 메시지를 클라이언트에게 보냄
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "mytodo 리스트 상태 변경에 실패했습니다.",
      });
    }
  };

  // mytodo 삭제
  mytodoDelete = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { todoId } = req.params;

      await this.mytodoService.mytodoDelete(userId, todoId);

      return res.status(201).json({});
    } catch (error) {
      if (err instanceof CustomError) {
        // 커스텀 에러에 따라 다른 상태 코드와 에러 메시지를 클라이언트에게 보냄
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "mytodo 리스트 삭제에 실패했습니다.",
      });
    }
  };
}

module.exports = MytodoController;
