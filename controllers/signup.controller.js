const CustomError = require("../utils/error.utils");
const SignUpService = require("../services/signup.service");

class SignUpController {
  signUpService = new SignUpService();

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { userName, userPassword } = req.body;
  
      // 입력값 유효성 검사
      if (!userName || !userPassword) {
        throw new CustomError("입력값이 올바르지 않습니다.", 402);
      }
  
      await this.signUpService.signUp(userName, userPassword, res);
  
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
        message: "회원가입에 실패했습니다.",
      });
    }
  };
}

module.exports = SignUpController;
