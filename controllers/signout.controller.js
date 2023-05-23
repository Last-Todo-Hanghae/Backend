const CustomError = require("../utils/error.utils");
const SignOutService = require("../services/signout.service");

class SignOutController {
  signOutService = new SignOutService();

  signOut = async (req, res, next) => {
    try {
      const refreshToken = res.locals.refreshToken;
      const status = await this.signOutService.signOut(refreshToken);
  
      if (status) {
        // 공백의 Access Token을 Cookie에 전달 하여 Access Token 정보 초기화
        res.cookie("accessToken", `Bearer `, { secure: false });
        // 공백의 Refresh Token을 Cookie에 전달 하여 Access Token 정보 초기화
        res.cookie("refreshToken", `Bearer `, { secure: false });
      } else {
        throw new CustomError("로그아웃에 실패했습니다.", 403);
      }
  
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
        message: "로그아웃에 실패했습니다.",
      });
    }
  };
}

module.exports = SignOutController;
