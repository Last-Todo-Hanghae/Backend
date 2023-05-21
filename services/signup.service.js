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

// // 아이디 유효성, 비밀번호 유효성, 비밀번호 확인 로직
// const { userName, userPassword, confirmPassword } = req.body;

// // 아이디 유효성 검사
// const idRegex = /^[a-zA-Z0-9]{3,}$/;
// if (!idRegex.test(userName)) {
//   return res.status(402).json({
//     message: "아이디 유효성 검사 실패"
//   });
// }

// // 패스워드 유효성 검사
// const pwRegex = new RegExp(`^((?!${userName}).){4,}$`);
// if (!pwRegex.test(userPassword)) {
//   return res.status(402).json({
//     message: "패스워드 유효성 검사 실패"
//   });
// }

// // 패스워드와 패스워드 확인 비교
// if (userPassword !== confirmPassword) {
//   return res.status(402).json({
//     message: "패스워드가 패스워드 확인란과 다릅니다."
//   });
// }
