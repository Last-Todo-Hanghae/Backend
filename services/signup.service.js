const CustomError = require("../utils/error.utils");
const UserRepository = require("../repositories/user.repository");
const UserInfoRepository = require("../repositories/userinfo.repository");

class SignUpService {
  userRepository = new UserRepository();
  userInfoRepository = new UserInfoRepository();

  signUp = async (userName, userPassword, res) => {
    // userName이 동일한 데이터가 있는지 확인
    const checkUser = await this.userRepository.getUserByName(userName);
    if (checkUser) {
      throw new CustomError("중복된 닉네임입니다.", 401);
    }
    
    // user 생성
    const postUser = await this.userRepository.postUser(userName, userPassword);
  
    // userInfo 생성
    const postUserInfo = await this.userInfoRepository.postUserinfo(postUser.userId)
  
    return postUser, postUserInfo;
  }
}

module.exports = SignUpService;