// 모델 가져오기
const { Token } = require("../models");

// 로그아웃 API
const signOut = async (userId) => {
  try {
    // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장
    await Token.destroy({ where: { refreshToken: userId } });

    return true;
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "로그아웃에 실패했습니다.",
    });
  }
};

module.exports = {
  signOut,
};
