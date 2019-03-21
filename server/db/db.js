const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/mskchat', {
  logging: false,
});
module.exports = db;

//postgres://user:user@127.0.0.1:5434/project
//localhost:5432/mskchat'
