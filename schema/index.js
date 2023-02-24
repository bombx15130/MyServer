const file = './mydb.db';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(file);

module.exports = db
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize({
//   host: 'localhost',
//   dialect: 'sqlite',

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   storage: './database.sqlite',
//   operatorsAliases: false
// });