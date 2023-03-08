const express = require('express')
const app = express()

const auth = require('./middlewares/auth')
app.set('view engine', 'ejs');

app.use(express.json());

const userController = require('./controllers/user')

app.get('/user/all', auth, userController.getAllUsers)
app.post('/user/register', userController.register)
app.post('/user/login', userController.login)

app.get('/', function (req, res) {
  res.send(token)
})

app.post("/api/logout", function (req, res) {
  
})

app.listen(3000)