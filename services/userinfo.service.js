// 모델 가져오기
const { User } = require("../models");

// Sequlize Operation 연산 사용을 위해 추가
const { Op } = require("sequelize");

// 비밀번호 변경 API
const pwChange = async (userName, userPassword, newPassword) => {
  try {
    const user = await User.findOne({ where: { userName } });

    // 아이디 및 비밀번호 유효성 검사
    if (!user || userPassword !== user.userPassword) {
      return res.status(401).json({
        message: "비밀번호 또는 아이디가 일치하지 않습니다.",
      });
    }

    // 패스워드 변경
    await User.update(
      {
        userPassword: newPassword,
      },
      {
        where: {
          [Op.and]: [{ userName }, { userPassword }],
        },
      }
    );

    return {};
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "비밀번호 변경에 실패했습니다.",
    });
  }
};

module.exports = {
  pwChange,
};
