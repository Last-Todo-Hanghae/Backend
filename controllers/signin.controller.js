const signinService = require("../services/signin.service");

const signIn = async (req, res) => {
  try {
    const { userName, userPassword } = req.body;

    // 입력값 유효성 검사
    if (!userName || !userPassword) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    const { accessToken, refreshToken } = await signinService.signIn(
      userName,
      userPassword
    );

    // Access Token을 Cookie에 전달
    res.cookie("accessToken", `Bearer ${accessToken}`, { secure: false });
    // Refresh Token을 Cookie에 전달한다.
    res.cookie("refreshToken", `Bearer ${refreshToken}`, { secure: false });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "로그인에 실패했습니다.",
    });
  }
};

module.exports = {
  signIn,
};
