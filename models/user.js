const db = require('../schema')

const userModel = {
  getAll: async() => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM Users", function(err, rows) {
        resolve(rows)
      })
    })
  },
  add: (data) => {
    const {username, password, token} = data
    var sqlInsert = 'INSERT INTO Users(id,username,password,token) VALUES (?,?,?,?)';
    db.run(sqlInsert, [null, username, password, token]);
  },
  get: (username) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM Users WHERE username="${username}"`, (err, row) => {
        console.log('err', err)
        console.log('row', row)
        resolve(row)
      })
    })
  },
}

module.exports = userModel
