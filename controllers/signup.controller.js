const signupService = require("../services/signup.service");

const signUp = async (req, res) => {
  try {
    const { userName, userPassword } = req.body;

    // 입력값 유효성 검사
    if (!userName || !userPassword) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    await signupService.signUp(userName, userPassword);

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "회원가입에 실패했습니다.",
    });
  }
};

module.exports = {
  signUp,
};
