// express 모듈 사용
const express = require("express");
const app = express();

// Cookie Parser 모듈 사용 - 요청된 쿠키를 쉽게 사용할 수 있도록 도와주는 모듈, express(req, res) 객체에 cookie를 사용할 수 있도록 기능을 부여
const cookieParser = require("cookie-parser");

// 서비스 포트 정의
const port = 3000;

// 로그 미들웨어 함수
function logMiddleware(req, res, next) {
  const currentDate = new Date().toLocaleString("ko-KR");
  const method = req.method;
  const url = req.originalUrl;

  console.log(`[${currentDate}] ${method} ${url}`);
  next();
}

// 로그 미들웨어를 애플리케이션에 적용
app.use(logMiddleware);

// routes/index.js 파일에서 라우터 정보 가져오기
const { indexRouter, signupRouter, signinRouter, mytodoRouter, yourtodoRouter } = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);
app.use("/api", [ signupRouter, signinRouter, mytodoRouter, yourtodoRouter ]);

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .send("서버에서 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다.");
});

app.listen(port, () => {
  console.log("Server is running. PORT :", port);
});
