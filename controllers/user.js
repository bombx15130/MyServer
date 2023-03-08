const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const { jwtSECRET } = require('../config')

const userController = {
  getAllUsers: async (req, res) => {
    const users = await userModel.getAll()
    res.send(users)
  },
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body
      const token = jwt.sign({ _username: req.body.username }, jwtSECRET, { expiresIn: '1 day' })
      
      if (!username || username === '') return res.status(400).send({ message: 'username is required' })
      if (!password || password === '') return res.status(400).send({ message: 'password is required' })
      if (!email || email === '') return res.status(400).send({ message: 'email is required' })
      const user1 = await userModel.findUser('username', username)
      if (user1) return res.status(400).send({ message: 'username already exists' })
      const user2 = await userModel.findUser('email', email)
      if (user2) return res.status(400).send({ message: 'email already exists' })
      await userModel.add({ ...req.body })
      res.send({
        success: true,
        data: { username: req.body.username, token }
      })
    } catch (error) {
      res.send(error)
    }

  },
  login: async (req, res) => {
    const user = await userModel.findUser('username', req.body.username)
    if (!user) return res.status(400).send({ message: 'user not exist' })
    if (user.password !== req.body.password) return res.status(400).send({ message: 'password error' })
    const token = jwt.sign({ _username: req.body.username }, jwtSECRET, { expiresIn: '1 day' })

    res.send({
      success: true,
      data: {
        username: user.username,
        token: token
      }
    })
  }
}

module.exports = userController