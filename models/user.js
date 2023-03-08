const User = require('../schema/user')

const userModel = {
  getAll: async() => {
    const users = await User.findAll()
    return users
  },
  add: async (data) => {
    await User.create(data)
  },
  findUser: async (key, value) => {
    const data = await User.findOne({
      where: { [key]: value }
    })
    return data
  }
}

module.exports = userModel
