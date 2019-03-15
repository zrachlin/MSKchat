const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('lastVisit', {
  time: {
    type: Sequelize.DATE,
  },
});
