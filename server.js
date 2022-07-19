const express = require("express");

const http = require("http");
const https = require("https");
const fs = require("fs");

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

const options = {
  key: fs.readFileSync("./_key.pem", "utf-8"),
  cert: fs.readFileSync("./_crt.pem", "utf-8"),
};

https
  .createServer(
    {
      key: fs.readFileSync("./_key.pem", "utf-8"),
      cert: fs.readFileSync("./_crt.pem", "utf-8"),
    },
    function (req, res) {
      res.write("Congrats! You made https server now :)");
      res.end();
    }
  )
  .listen(3001);

const app = express();

const port = 3307; // react의 기본값은 3000이니까 3000이 아닌 아무 수
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
  res.json({
    message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}`,
  });
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

// app.listen(port, () => {
//   console.log(`Connect at http://asdf:${port}`);
// });

// http.createServer(app).listen(HTTP_PORT);
// https.createServer(options, app).listen(HTTPS_PORT);
