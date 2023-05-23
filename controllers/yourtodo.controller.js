const CustomError = require("../utils/error.utils");
const YourtodoService = require("../services/yourtodo.service");

class YourtodoController {
  yourtodoService = new YourtodoService();

  // yourtodo 전체 리스트 조회
  yourtodoGet = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const source = userId;

      // 입력값 유효성 검사
      if (!source) {
        throw new CustomError("입력값이 올바르지 않습니다.", 402);
      }

      const yourtodo = await this.yourtodoService.yourtodoGet(source);

      return res.status(200).json({ yourtodo });
    } catch (err) {
      if (err instanceof CustomError) {
        // 커스텀 에러에 따라 다른 상태 코드와 에러 메시지를 클라이언트에게 보냄
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "yourtodo 리스트 조회에 실패했습니다.",
      });
    }
  };

  // yourtodo 상세 조회
  yourtodoGetDetail = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const source = userId;
      const target = req.params.userId;

      // 입력값 유효성 검사
      if (!source || !target) {
        throw new CustomError("입력값이 올바르지 않습니다.", 402);
      }

      const { userName, userImage, isLike, mytodo } = await this.yourtodoService.yourtodoGetDetail(
        source,
        Number(target)
      );

      return res.status(200).json({ userName, userImage, isLike, mytodo });
    } catch (err) {
      if (err instanceof CustomError) {
        // 커스텀 에러에 따라 다른 상태 코드와 에러 메시지를 클라이언트에게 보냄
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "yourtodo 상세 조회에 실패했습니다.",
      });
    }
  };

  // yourtodo 좋아요 상태 수정 API
  yourtodoPutLike = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const source = userId;
      const target = req.params.userId;

      await this.yourtodoService.yourtodoPutLike(source, Number(target));

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
        message: "yourtodo 좋아요 상태 변경에 실패했습니다.",
      });
    }
  };
}

module.exports = YourtodoController;
