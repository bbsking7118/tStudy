const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
var cors = require("cors");

module.exports = function () {
  const app = express();

  /* 미들웨어 설정 */
  app.use(compression()); // HTTP 요청을 압축 및 해제
  app.use(express.json()); // body값을 파싱
  app.use(express.urlencoded({ extended: true })); // form 으로 제출되는 값 파싱
  app.use(methodOverride()); // put, delete 요청 처리
  app.use(cors({
    origin: "https://www.east2000.co.kr", // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })); // 웹브라우저 cors 설정을 관리
  app.use(express.static("/home/ubuntu/tStudy/front")); // express 정적 파일 제공 (html, css, js 등..)
  // app.use(express.static(process.cwd() + '/public'));

  /* 직접 구현해야 하는 모듈 */
  require("../src/routes/indexRoute")(app);

  return app;
};
