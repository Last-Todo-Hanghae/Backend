const CustomError = require("../utils/error.utils");
const { TokenUtil } = require("../utils/token.utils");
const signinRepository = require("../repositories/signin.repository");

// 로그인
const signIn = async (userName, userPassword) => {
  const user = await signinRepository.findUser(userName);

  // 아이디 및 비밀번호 유효성 검사
  if (!user || userPassword !== user.userPassword) {
    throw new CustomError("비밀번호 또는 아이디가 일치하지 않습니다.", 401);
  }

  // JWT 토큰 생성
  const tokenUtil = new TokenUtil(user.userId, user.userName);
  const accessToken = tokenUtil.createAccessToken()
  const refreshToken = tokenUtil.createRefreshToken();

  // Refresh Token 존재여부 확인
  const checkToken = await signinRepository.findToken(refreshToken);

  // Refresh Token이 있다면 삭제 진행
  if (checkToken) {
    await signinRepository.deleteToken(refreshToken);
  }

  // 해당 유저의 Refresh Token, userId 정보를 서버의 Token 테이블에 저장
  await signinRepository.signIn(refreshToken);

  return { accessToken, refreshToken };
};

module.exports = {
  signIn,
};
