const Sequelize = require('sequelize');

/*
Before running, replace 'your-username' and 'your-password' in the string below with your actual postgres credentials. If you don't have credentials, 'postgres://localhost:5432/mskchat' should work instead.
*/
const connectionString =
  'postgres://your-username:your-password:localhost:5432/mskchat';

const db = new Sequelize(connectionString, {
  logging: false,
});
module.exports = db;

// Issues with connection string:
// Reference issue: https://github.com/sequelize/sequelize/issues/4165

// Formerly:
// 'postgres://localhost:5432/mskchat'

// Changed to:
// 'postgres://localhost/mskchat'

// Other potential option:
// 'postgres://user:password@127.0.0.1:/project'
