// @ts-check
/* 파일 상단에 @ts-check 주석을 추가하면 간단한 문법 오류를 잡아줍니다! */

const CustomError = require("../utils/error.utils");
const yourtodoService = require("../services/yourtodo.service");

// yourtodo 전체 리스트 조회
const yourtodoGet = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const source = userId;

    // 입력값 유효성 검사
    if (!source) {
      throw new CustomError("입력값이 올바르지 않습니다.", 402);
    }

    const yourtodo = await yourtodoService.yourtodoGet(source);

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
const yourtodoGetDetail = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const source = userId;
    const target = req.params.userId;

    // 입력값 유효성 검사
    /* REVIEW: 분기처리는 긍정문으로 작성해 주시는 것이 읽기 더 편합니다! 
       if (source && target) {
    */
    if (!source || !target) {
      throw new CustomError("입력값이 올바르지 않습니다.", 402);
    }

    const { userName, userImage, isLike, mytodo } = await yourtodoService.yourtodoGetDetail(
      source,
      /* REVIEW: Number() 보다는 parseInt를 지향해주세요!*/
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
const yourtodoPutLike = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const source = userId;
    const target = req.params.userId;

    await yourtodoService.yourtodoPutLike(source, Number(target));

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

module.exports = {
  yourtodoGet,
  yourtodoGetDetail,
  yourtodoPutLike,
};
