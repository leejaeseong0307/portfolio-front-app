const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// 기본 라우트 설정
app.get("/", (req, res) => {
  res.send("Hello, Node.js!");
});

// 서버 실행
app.listen(5000, () => {
  console.log("서버 실행 중: http://localhost:5000");
});
