const express = require("express");
const app = express();

const port = 81; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

const path = require("path");

const multer = require("multer");

var connection = mysql.createConnection({
  host: "125.6.40.93",
  user: "hansori", //mysql의 id
  password: "Hansori@901829", //mysql의 password
  // host: "15.165.68.170",
  // user: "hansori", //mysql의 id
  // password: "Hansori@901829", //mysql의 password
  database: "hansori", //사용할 데이터베이스
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.post("/SQL1", (req, res) => {
  const post = req.body.query;

  connection.query(post, function (err, rows, fields) {
    if (err) {
      console.log("전송 실패");
    } else {
      console.log("전송 성공");
      console.log(rows[0]);
      res.send(rows[0]);
    }
  });
});

app.post("/SQL2", (req, res) => {
  const post = req.body.query;

  connection.query(post, function (err, rows, fields) {
    if (err) {
      console.log("전송 실패");
    } else {
      console.log("전송 성공");
      //console.log(rows[0]);
      res.send(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Connect at http://asdf:${port}`);
});
