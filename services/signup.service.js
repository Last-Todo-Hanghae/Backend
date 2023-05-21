const CustomError = require("../utils/error.utils");
const signupRepository = require("../repositories/signup.repository");

const signUp = async (userName, userPassword, res) => {
  // userName이 동일한 데이터가 있는지 확인
  const findUser = await signupRepository.findUser(userName);
  if (findUser) {
    throw new CustomError("중복된 닉네임입니다.", 401);
  }
  
  // user 생성
  const createUser = await signupRepository.createUser(userName, userPassword);

  // userInfo 생성
  const createUserinfo = await signupRepository.createUserinfo(createUser.userId)

  return createUser, createUserinfo;
}

module.exports = {
  signUp,
};
