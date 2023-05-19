const signoutService = require("../services/signout.service");

const signOut = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const status = await signoutService.signOut(userId);

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
  signOut,
};
