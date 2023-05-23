const { UserInfo } = require("../models"); // 모델 가져오기

class UserInfoRepository {
  // 유저 정보 테이블에 회원정보 저장
  postUserinfo = async (userId) => {
    const userInfo = await UserInfo.create({ userId });
    return userInfo;
  };
}

module.exports = UserInfoRepository;
