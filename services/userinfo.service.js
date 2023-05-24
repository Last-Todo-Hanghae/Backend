const CustomError = require("../utils/error.utils");
const UserRepository = require("../repositories/user.repository");
const UserInfoRepository = require("../repositories/userinfo.repository");

class UserInfoService {
  userRepository = new UserRepository();
  userInfoRepository = new UserInfoRepository();

  // S3에 이미지 업로드 및 이미지 URL DB에 저장
  uploadImage = async (imageURL, userId) => {
    await this.userInfoRepository.uploadImage(imageURL, userId);
    return true;
  };

  // 비밀번호 변경 API
  pwChange = async (userName, userPassword, newPassword) => {
    const checkUser = await this.userRepository.getUserByName(userName);

    // 아이디 및 비밀번호 유효성 검사
    if (!checkUser || userPassword !== checkUser.userPassword) {
      throw new CustomError("비밀번호 또는 아이디가 일치하지 않습니다.", 401);
    }

    // 패스워드 변경
    await this.userRepository.putUser(userName, userPassword, newPassword);
    return true;
  };

  // 유저 정보 조회(userName)
  getUserInfo = async (userId) => {
    const { userName } = await this.userRepository.getUserById(userId);

    // 아이디 유효성 검사
    if (!userName) {
      throw new CustomError("토큰 정보가 올바르지 않습니다.", 401);
    }
    return userName;
  };
}

module.exports = UserInfoService;
