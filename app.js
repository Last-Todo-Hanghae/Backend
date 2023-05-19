require("dotenv").config(); // dotenv 파일을 통해 포트 정보 가저오기
const cookieParser = require("cookie-parser"); // Cookie Parser 모듈 사용 - 요청된 쿠키를 쉽게 사용할 수 있도록 도와주는 모듈, express(req, res) 객체에 cookie를 사용할 수 있도록 기능을 부여
const express = require("express"); // express 모듈 사용
const routes = require("./routes"); // routes/index.js 파일에서 라우터 정보 가져오기
const logMiddleware = require("./middlewares/logMiddleware"); // log Middleware 모듈 가져오기
const app = express();

// 서비스 포트 정의
const port = process.env.SERVICE_PORT;

// routes/index.js 파일에서 라우터 정보 가져오기
// const {
//   signupRouter,
//   signinRouter,
//   mytodoRouter,
//   yourtodoRouter,
// } = require("./routes");

app.use(logMiddleware); // 로그 미들웨어를 애플리케이션에 적용
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", routes);

app.get("/", async (req, res) => {
  res.status(200).send("기본 페이지 입니다.");
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .send("서버에서 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다.");
});

const start = async () => {
  try {
    app.listen(port, () => {
      console.log("Server is running. PORT :", port);
    });
  } catch (error) {
    console.error(err);
  }
}

start();
