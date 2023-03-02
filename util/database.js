const Sequelize = require('sequelize');

const sequelize = new Sequelize('group_chat', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
