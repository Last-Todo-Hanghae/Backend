require("dotenv").config(); // dotenv 파일을 통해 포트 정보 가저오기
const cookieParser = require("cookie-parser"); // Cookie Parser 모듈 사용 - 요청된 쿠키를 쉽게 사용할 수 있도록 도와주는 모듈, express(req, res) 객체에 cookie를 사용할 수 있도록 기능을 부여
const express = require("express"); // express 모듈 사용
const routes = require("./routes"); // routes/index.js 파일에서 라우터 정보 가져오기
const logMiddleware = require("./middlewares/logMiddleware"); // log Middleware 모듈 가져오기
const cors = require('cors') // cors 미들웨어 추가
const app = express();
const { swaggerUi, specs } = require("./swagger/swagger") // 
const port = process.env.SERVICE_PORT || 3000; // 서비스 포트 정의

app.use(cors({
  origin: process.env.FRONTEND_DOMAIN || true // 특정 도메인만 허용하기 위해서는 true 값에 도메인 정보 입력 필요 ex> "http://아이피정보"
})) // cors 미들웨어 추가
app.use(logMiddleware); // 로그 미들웨어를 애플리케이션에 적용
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)) // swagger

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
