const userinfoService = require("../services/userinfo.service");

const pwChange = async (req, res) => {
  try {
    const { userName, userPassword, newPassword } = req.body;

    // 입력값 유효성 검사
    if (!userName || !userPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    await userinfoService.pwChange(userName, userPassword, newPassword);

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "비밀번호 변경에 실패했습니다.",
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { userId } = res.locals.user;

    // 입력값 유효성 검사
    if (!userId) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    const { userName } = await userinfoService.getUserInfo(userId);

    return res.status(200).json({ userName });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "유저 정보 조회에 실패했습니다.",
    });
  }
};

module.exports = {
  pwChange, getUserInfo,
};
