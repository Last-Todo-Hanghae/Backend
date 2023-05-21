// dotenv 파일을 통해 시크릿 정보 가저오기
require("dotenv").config();
const env = process.env;
const jwt = require("jsonwebtoken");

// 시크릿 키 정의
const secretKey = env.JWT_SECRET;

class Token {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  // Access Token 생성 메서드
  createAccessToken() {
    const accessToken = jwt.sign(
      {
        userId: this.id,
        userName: this.name,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    return accessToken;
  }

  // Refresh Token 생성 메서드
  createRefreshToken() {
    const refreshToken = jwt.sign(
			{},
			secretKey,
			{ expiresIn: "7d" }
		);
    return refreshToken;
  }
}

class VerifyToken {
	constructor(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

	// Access Token 검증 함수
	validateAccessToken() {
		try {
			jwt.verify(this.accessToken, secretKey);
			return true;
		} catch (error) {
			return false;
		}
	}

	// Refresh Token 검증 함수
	validateRefreshToken() {
		try {
			jwt.verify(this.refreshToken, secretKey);
			return true;
		} catch (error) {
			return false;
		}
	}

	// Access Token의 Payload를 가져오는 함수
	getAccessTokenPayload() {
		try {
			const payload = jwt.verify(this.accessToken, secretKey);
			return payload;
		} catch (error) {
			return null;
		}
	}
}

module.exports = { Token, VerifyToken };
