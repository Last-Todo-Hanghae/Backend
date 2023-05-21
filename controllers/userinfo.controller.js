const CustomError = require("../utils/error.utils");
const userinfoService = require("../services/userinfo.service");

const pwChange = async (req, res) => {
  try {
    const { userName, userPassword, newPassword } = req.body;

    // 입력값 유효성 검사
    if (!userName || !userPassword || !newPassword) {
      throw new CustomError("입력값이 올바르지 않습니다.", 402);
    }

    await userinfoService.pwChange(userName, userPassword, newPassword);

    return res.status(200).json({});
  } catch (err) {
    if (err instanceof CustomError) {
      // 커스텀 에러에 따라 다른 상태 코드와 에러 메시지를 클라이언트에게 보냄
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }
    console.log(err);
    return res.status(403).json({
      message: "비밀번호 변경에 실패했습니다.",
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { userId } = res.locals.user;

    // 입력값 유효성 검사
    if (!userId) {
      throw new CustomError("입력값이 올바르지 않습니다.", 402);
    }

    const { userName } = await userinfoService.getUserInfo(userId);

    return res.status(200).json({ userName });
  } catch (err) {
    if (err instanceof CustomError) {
      // 커스텀 에러에 따라 다른 상태 코드와 에러 메시지를 클라이언트에게 보냄
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }
    console.log(err);
    return res.status(403).json({
      message: "유저 정보 조회에 실패했습니다.",
    });
  }
};

module.exports = {
  pwChange, getUserInfo,
};
