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

const userInfoChange = async (req, res) => {
  try {
    const { userName, userPassword, newPassword } = req.body;

    // 입력값 유효성 검사
    if (!userName || !userPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    await signinService.userInfoChange(userName, userPassword, newPassword);

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "비밀번호 변경에 실패했습니다.",
    });
  }
};

const signOut = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const status = await signinService.signOut(userId);

    if (status) {
      // 공백의 Access Token을 Cookie에 전달 하여 Access Token 정보 초기화
      res.cookie("accessToken", `Bearer `, { secure: false });
      // 공백의 Refresh Token을 Cookie에 전달 하여 Access Token 정보 초기화
      res.cookie("refreshToken", `Bearer `, { secure: false });
    } else {
      throw new Error("로그아웃에 실패했습니다.");
    }

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "로그아웃에 실패했습니다.",
    });
  }
};

module.exports = {
  signIn,
  userInfoChange,
  signOut,
};
