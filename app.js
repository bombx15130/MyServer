const express = require('express')
const app = express()

const db = require('./schema');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, token TEXT)");

  // var sqlInsert = 'INSERT INTO Users(id,username,password,token) VALUES (?,?,?,?)';
  // db.run(sqlInsert, [null, 'Paul', 'abc123', '']);
  // console.log('insert success');

  // db.each("select * from Users", function (err, table) {
  //   console.log(table);
  // });
});



const auth = require('./middlewares/auth')
app.set('view engine', 'ejs');

app.use(express.json());

const userController = require('./controllers/user')

app.get('/user/all', auth, userController.getAllUsers)
app.post('/user/register', userController.addUser)
app.post('/user/login', userController.handleVerify)

app.get('/', function (req, res) {
  res.send(token)
})

app.post("/api/logout", function (req, res) {
  
})

// db.close();

app.listen(3000)