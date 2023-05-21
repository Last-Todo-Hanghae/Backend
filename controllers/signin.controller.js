const CustomError = require("../utils/error.utils");
const signinService = require("../services/signin.service");

const signIn = async (req, res) => {
  try {
    const { userName, userPassword } = req.body;

    // 입력값 유효성 검사
    if (!userName || !userPassword) {
      throw new CustomError("입력값이 올바르지 않습니다.", 402);
    }

    const { accessToken, refreshToken } = await signinService.signIn(
      userName,
      userPassword
    );

    // Access Token을 Cookie에 전달
    res.cookie("accessToken", `Bearer ${accessToken}`, { secure: false });
    // Refresh Token을 Cookie에 전달한다.
    res.cookie("refreshToken", `Bearer ${refreshToken}`, { secure: false });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    if (err instanceof CustomError) {
      // 커스텀 에러에 따라 다른 상태 코드와 에러 메시지를 클라이언트에게 보냄
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }
    console.log(err);
    return res.status(403).json({
      message: "로그인에 실패했습니다.",
    });
  }
};

module.exports = {
  signIn,
};
