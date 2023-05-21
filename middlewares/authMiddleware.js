const jwt = require("jsonwebtoken");
const { User, Token } = require("../models");

// dotenv 파일을 통해 시크릿 정보 가저오기
require("dotenv").config();
const env = process.env;

// 시크릿 키 정의
const secretKey = env.JWT_SECRET;

// Access Token 생성 함수
function createAccessToken(id, name) {
  const accessToken = jwt.sign({ userId: id, userName: name }, secretKey, {
    expiresIn: "1h",
  });
  return accessToken;
}

// Access Token 검증 함수
function validateAccessToken(accessToken) {
  try {
    jwt.verify(accessToken, secretKey);
    return true;
  } catch (error) {
    return false;
  }
}

// Refresh Token 검증 함수
function validateRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, secretKey);
    return true;
  } catch (error) {
    return false;
  }
}

// Access Token의 Payload를 가져오는 함수
function getAccessTokenPayload(accessToken) {
  try {
    const payload = jwt.verify(accessToken, secretKey); // JWT에서 Payload를 가져옵니다.
    return payload;
  } catch (error) {
    return null;
  }
}

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  try {
    // console.log(req.rawHeaders)
    // 쿠키 값이 없을 경우
    if (
      req.headers === undefined
      // req.cookies.accessToken === undefined ||
      // req.cookies.refreshToken === undefined
    ) {
      return res.status(401).json({
        message: "로그인 후 이용 가능한 기능입니다.",
      });
    }

    // 쿠키 일치 여부 확인
    // console.log(req)
    // const accessToken = req.cookies.accessToken;
    // const refreshToken = req.cookies.refreshToken;
    
    const accessToken = req.headers.accessToken;
    const refreshToken = req.headers.refreshToken;
    
    // console.log(accessToken)
    // console.log(refreshToken)
    const [accessAuthType, accessAuthToken] = (accessToken ?? "").split(" ");
    if (!accessAuthToken || accessAuthType !== "Bearer") {
      return res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
    }
    const [refreshAuthType, refreshAuthToken] = (refreshToken ?? "").split(" ");
    if (!refreshAuthToken || refreshAuthType !== "Bearer") {
      return res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
    }

    // 토큰 유효성 검사
    const isAccessTokenValidate = validateAccessToken(accessAuthToken);
    const isRefreshTokenValidate = validateRefreshToken(refreshAuthToken);

    if (!isRefreshTokenValidate)
      return res
        .status(402)
        .json({ message: "Refresh Token이 만료되었습니다." });
    const decodedToken = jwt.verify(accessAuthToken, secretKey);
    const id = decodedToken.userId;

    if (!isAccessTokenValidate) {
      const { accessTokenId } = await Token.findOne({
        where: { refreshToken: id },
      });
      if (!accessTokenId)
        return res.status(402).json({
          message: "Refresh Token의 정보가 서버에 존재하지 않습니다.",
        });

      const user = await User.findOne({ where: { userId: id } });

      const newAccessToken = createAccessToken(user.userId, user.userName);
      res.cookie("accessToken", `Bearer ${newAccessToken}`, { secure: false });
      return res.json({ message: "Access Token을 새롭게 발급하였습니다." });
    }

    const { userId } = getAccessTokenPayload(accessAuthToken);

    // 닉네임은 있지만 실제 DB에 유저가 없는 경우에 대한 로직 추가
    const user = await User.findOne({ where: { userId } });
    if (user === null) {
      console.log("userId 값을 찾을 수 없습니다.");
      res.status(401).send({
        message: "로그인 후 이용 가능한 기능입니다.",
      });
    }
    res.locals.refreshToken = refreshToken;
    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err.stack);
    res.status(401).send({
      message: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
