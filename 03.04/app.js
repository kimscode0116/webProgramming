let express = require('express');
let http = require('http');
let app = express();

//80번 포트에서 서버 리퀘스
let server = http.createServer(app).listen(80);

//메인 주소로 리퀘스트를 받아서 서버로 보내주겠
app.get('/', function (req, res) {
	res.send([10, 20, 30]);
});

app.get('/test', function (req, res) {
	res.send("hello worlddd_ddddd");
});

app.get('/test2', function (req, res) {
	res.send("hello world2");
});

app.get('/practice', function (req, res) {
	res.sendfile("practice.html");
});
