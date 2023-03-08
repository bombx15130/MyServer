const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const { jwtSECRET } = require('../config')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    jwt.verify(token, jwtSECRET, async (err, decoded) => {
      if (err) {
        throw new Error('authenticate error')
      } else {
        const user = await userModel.findUser('username', decoded._username)
        if (user) {
          next()
        } else {
          throw new Error('user not exist')
        }
      }
    })
  } catch (error) {
    res.status(401).send({ error: 'authenticate error' })
  }
}

module.exports = auth