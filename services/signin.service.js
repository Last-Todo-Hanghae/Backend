const CustomError = require("../utils/error.utils");
const { TokenUtil } = require("../utils/token.utils");
const UserRepository = require("../repositories/user.repository");
const TokenRepository = require("../repositories/token.repository");

class SignInService {
  userRepository = new UserRepository();
  tokenRepository = new TokenRepository();

  // 로그인
  signIn = async (userName, userPassword) => {
    // 유저 정보 조회
    const user = await this.userRepository.getUserByName(userName);

    // 아이디 및 비밀번호 유효성 검사
    if (!user || userPassword !== user.userPassword) {
      throw new CustomError("비밀번호 또는 아이디가 일치하지 않습니다.", 401);
    }

    // JWT 토큰 생성
    const tokenUtil = new TokenUtil(user.userId, user.userName);
    const accessToken = tokenUtil.createAccessToken()
    const refreshToken = tokenUtil.createRefreshToken();

    // Refresh Token 존재여부 확인
    const checkToken = await this.tokenRepository.getToken(refreshToken);

    // Refresh Token이 있다면 삭제 진행
    if (checkToken) {
      await this.tokenRepository.deleteToken(refreshToken);
    }

    // 해당 유저의 Refresh Token 정보를 서버의 Token 테이블에 저장
    await this.tokenRepository.postToken(refreshToken);

    return { accessToken, refreshToken };
  };

}

module.exports = SignInService;
