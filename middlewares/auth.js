const userModel = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const userDatas = await userModel.get(req.body.username)

    if (!userDatas) throw new Error()
    req.token = token
    req.user = userDatas

    next()
  } catch (error) {
    res.status(401).send({ error: 'authenticate error' })
  }
}

module.exports = auth