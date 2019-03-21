const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/mskchat', {
  logging: false,
});
module.exports = db;

// Issues with connection string:
// Reference issue: https://github.com/sequelize/sequelize/issues/4165

// Formerly:
// 'postgres://localhost:5434/mskchat'

// Changed to:
// 'postgres://localhost/mskchat'

// Other potential option:
// 'postgres://user:user@127.0.0.1:/project'
