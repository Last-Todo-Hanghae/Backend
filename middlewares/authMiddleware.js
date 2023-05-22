const CustomError = require("../utils/error.utils");
const jwt = require("jsonwebtoken");
const { User, Token } = require("../models");
const { TokenUtil, VerifyToken } = require("../utils/token.utils");

// dotenv 파일을 통해 시크릿 정보 가저오기
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  try {
    if (
      req.headers.accesstoken === undefined ||
      req.headers.refreshtoken === undefined
    ) {
      throw new CustomError("로그인 후 이용 가능한 기능입니다.1", 401);
    }
    
    const accessToken = req.headers.accesstoken;
    const refreshToken = req.headers.refreshtoken;
    
    const [accessAuthType, accessAuthToken] = (accessToken ?? "").split(" ");
    const [refreshAuthType, refreshAuthToken] = (refreshToken ?? "").split(" ");
    if (!accessAuthToken || accessAuthType !== "Bearer" || !refreshAuthToken || refreshAuthType !== "Bearer") {
      throw new CustomError("로그인 후 이용 가능한 기능입니다.2", 401);
    }

    // 토큰 유효성 검사
    const verifyToken = new VerifyToken(accessAuthToken,refreshAuthToken)
    const isAccessTokenValidate = verifyToken.validateAccessToken();
    const isRefreshTokenValidate = verifyToken.validateRefreshToken();

    if (!isRefreshTokenValidate) {
      throw new CustomError("Refresh Token이 만료되었습니다.", 402);
    };

    // Access 토큰 Decode -> 토큰의 payload에 닮긴 userId 정보 추출
    const decodedToken = jwt.verify(accessAuthToken, secretKey);
    const user = await User.findOne({ where: { userId: decodedToken.userId } });

    // Access 토큰 조회 및 토큰 재발급
    if (!isAccessTokenValidate && isRefreshTokenValidate) {
      const { findedRefreshToken } = await Token.findOne({
        where: { refreshToken },
      });

      if (!findedRefreshToken) {
        throw new CustomError("Refresh Token의 정보가 서버에 존재하지 않습니다.", 402);
      }

      // 토큰 재발급을 위한 객체 생성
      const createToken = new TokenUtil(user.userId,user.userName);

      const newAccessToken = createToken.createAccessToken();
      res.cookie("accessToken", `Bearer ${newAccessToken}`, { secure: false });
    }

    const payload = verifyToken.getAccessTokenPayload();

    // 닉네임은 있지만 실제 DB에 유저가 없는 경우에 대한 로직 추가
    const findedUser = await User.findOne({ where: payload.userId });
    if (findedUser === null) {
      throw new CustomError("userId 값을 찾을 수 없습니다.", 401);
    }

    res.locals.refreshToken = refreshAuthToken;
    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err.stack);
    res.status(401).send({
      message: "로그인 후 이용 가능한 기능입니다.3",
    });
  }
};
