const { UserInfo } = require("../models"); // 모델 가져오기

class UserInfoRepository {
  // 유저정보 테이블에 유저 S3 이미지 URL 저장
  uploadImage = async (imageURL, userId) => {
    const userInfo = await UserInfo.update(
      { userImage: imageURL },
      { where: { userId } }
    );
    return userInfo;
  }

  // 유저정보 테이블에 유저 아이디 저장
  postUserinfo = async (userId) => {
    const userInfo = await UserInfo.create({ userId });
    return userInfo;
  };
}

module.exports = UserInfoRepository;
