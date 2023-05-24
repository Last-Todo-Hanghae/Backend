const TokenRepository = require("../repositories/token.repository");

class SignOutService {
  tokenRepository = new TokenRepository();

  // 로그아웃
  signOut = async (refreshToken) => {
    await this.tokenRepository.deleteToken(refreshToken);
    return true;
  };
}

module.exports = SignOutService;