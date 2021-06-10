let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});

connection.connect();
var bodayParser = require('body-parser');
app.use(bodayParser.urlencoded({
  extended: false
}))
app.use(bodayParser.json());


app.get('/', function(req, res) {
  res.sendfile("main.html")
});

app.get('/insertPage', function(req, res) {
  res.sendfile("insertPage.html")
});

app.get('/listPage', function(req, res) {
  res.sendfile("listPage.html")
});

app.get('/updatePage', function(req, res) {
  res.sendfile("updatePage.html")
});

//create : 학생정보 추가하기
app.post('/insertNewStu', function(req, res) {
  let newStuNum = req.body.stuNum
  let newStuName = req.body.stuName
  let newStuJs = req.body.jsScore
  let newStuPy = req.body.pyScore
  let newStuJava = req.body.javaScore

  let sendResults = "";

  connection.query(`SELECT * FROM student
        WHERE studentNo = '${newStuNum}'`,
    function(error, results, fields) {
      console.log(results)
      if (results.length >= 1) {
        sendResults = "not ok";
        res.send(sendResults)
      } else if (results.length == 0) {
        connection.query(`INSERT INTO student
                (studentNo, studentName, javascript, python, java)
                VALUES
                ('${newStuNum}','${newStuName}','${newStuJs}','${newStuPy}','${newStuJava}')`,
          function(error, results, fields) {
            if (error) {
              sendResults = "error"
              res.send(sendResults)
            } else {
              sendResults = "ok"
              res.send(sendResults)
            }
          })
      }
    });
});

//read: 전체리스트 가져오기
app.get('/stuList', function(req, res) {
  connection.query(`SELECT * FROM student`,
    function(error, results, fields) {
      if (error) console.log(error)
      res.send(results);
    })
});

// // read : 정렬해서 1등 가져오기
// app.get('/stuScore', function(req, res) {
//   let arr = [];
//   connection.query(`SELECT * FROM student`,
//     function(error, results, fields) {
//
//       for (let i = 0; i < results.length; i++) {
//         arr[i] =results[i].javascript + results[i].python + results[i].java
//       }
//
//       let max = Math.max.apply(null,arr);
//
//       for(let i = 0; i<results.length; i++) {
//         if(arr[i] == max) {
//           connection.query(`SELECT * FROM student where studentNo = '${results[i].studentNo}'`,
//             function(error, results, fields) {
//               res.send(results);
//             });
//         }
//       }
//     });
// });

//read : 특정 컬럼별로 정렬해서 최고 득점자
app.post('/bestScore', function(req, res) {
  let category = req.body.category;
  let cnt = 0;
  let max = 0;
  connection.query(`SELECT *
FROM student
order by ${category} desc`,
    function(error, results, fields) {
      if (category == "javascript") {
        let score = results[0].javascript
        connection.query(`SELECT * FROM student where javascript = ${score}`,
          function(error, results, fields) {
            console.log(results);
            res.send(results)
          });
      }
      else if (category == "python") {
        let score = results[0].python
        connection.query(`SELECT * FROM student where python = ${score}`,
          function(error, results, fields) {
            console.log(results);
            res.send(results)

          });
      }
      else if (category == "java") {
        let score = results[0].java
        connection.query(`SELECT * FROM student where java = ${score}`,
          function(error, results, fields) {
            console.log(results);
            res.send(results)
          });
      }
      else console.log("not ok")
    });
});

// update: value 칸에 기존데이터 가져오기
app.get('/getStuData', function(req, res) {
  connection.query(`SELECT * FROM student
    where no = "${req.query.indexNumber}";`,
    function(error, results, fields) {
      if (error) console.log(error)
      res.send(results);
    })
});

// update: 데이터 업데이터
app.put('/updateStuInfo', function(req, res) {
  console.log(req.body.indexNum)
  connection.query(`UPDATE student SET
          studentName = '${req.body.updateName}',
          javascript = ${req.body.updateJs},
          python = ${req.body.updatePy},
          java = ${req.body.updateJava}
          WHERE no = ${req.body.indexNum};`,
    function(error, results, fields) {
      if (error) {
        sendResults = "not ok"
        console.log(sendResults)
        res.send(sendResults)
      } else {
        sendResults = "ok"
        res.send(sendResults)
      }
    })
});

// delete : 데이터 삭제
app.delete('/deleteData', function(req, res) {
  console.log(req.body.indexNumber)
  connection.query(`DELETE FROM student
WHERE no = "${req.body.indexNumber}";`,
    function(error, results, fields) {
      if (error) console.log(error)
      res.send(results);
    });
});
