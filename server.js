const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const cors = require("cors");

const HTTP_PORT = 8081;
const HTTPS_PORT = 8443;

const options = {
  key: fs.readFileSync("./_key.pem"),
  cert: fs.readFileSync("./_crt.pem"),
};

const app = express();

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));

// Default route for server status
app.get("/", (req, res) => {
  res.json({
    message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}`,
  });
});

// Create an HTTP server.
http.createServer(app).listen(HTTP_PORT);

// Create an HTTPS server.
https.createServer(options, app).listen(HTTPS_PORT);

const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

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

app.post("/SQL1", (req, res) => {
  const post = req.body.query;

  connection.query(post, function (err, rows, fields) {
    res.setHeader("Access-Control-Allow-origin", "*");

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
  console.log("sddddd");
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
