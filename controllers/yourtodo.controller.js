const yourtodoService = require("../services/yourtodo.service");

// yourtodo 전체 리스트 조회
const yourtodoGet = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const source = userId;

    // 입력값 유효성 검사
    if (!source) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    const { yourtodo } = await yourtodoService.yourtodoGet(source);

    return res.status(200).json({ yourtodo });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "yourtodo 리스트 조회에 실패했습니다.",
    });
  }
};

const yourtodoGetDetail = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const source = userId;
    const target = req.params.userId;

    // 입력값 유효성 검사
    if (!source || !target) {
      return res
        .status(400)
        .json({ message: "입력 정보가 올바르지 않습니다." });
    }

    const yourTodo = await yourtodoService.yourtodoGetDetail(
      source,
      Number(target)
    );

    return res.status(200).json({ yourTodo });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "yourtodo 상세 조회에 실패했습니다.",
    });
  }
};

// yourtodo 좋아요 상태 수정 API
const yourtodoPutLike = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const source = userId;
    const target = req.params.userId;

    await yourtodoService.yourtodoPutLike(source, Number(target));

    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).send({
      message: "yourtodo 좋아요 상태 변경에 실패했습니다.",
    });
  }
};

module.exports = {
  yourtodoGet,
  yourtodoGetDetail,
  yourtodoPutLike,
};
