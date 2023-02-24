const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

const SECRET = 'im paul'

async function verifyUser(data) {
  const { username, password, token } = data
  const decoded = jwt.verify(token, SECRET)
  const userDatas = userModel.get(decoded._username)
  

  if (username === userDatas.username && password === userDatas.password && token === userDatas.token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('login success');
      }, 300);
    })
  }
  return new Promise((resolve, reject) => reject(new Error('login fail')))
} 

const userController = {
  getAllUsers: async (req, res) => {
    const users = await userModel.getAll()
    console.log('users', users)
    res.send(users)
  },
  addUser: (req, res) => {
    const token = jwt.sign({ _username: req.body.username }, SECRET, { expiresIn: '1 day' })
    userModel.add({...req.body, token})

    res.send({
      success: true, 
      data: {username: req.body.username, token}
    })
  },
  handleVerify: (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    verifyUser({...req.body, token})
    .then(result => {
      res.send(result)
    })
    .catch(e => res.send(e))
  }
}

module.exports = userController