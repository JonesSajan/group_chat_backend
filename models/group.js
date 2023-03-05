const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const group = sequelize.define('group', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  admin: { type: Sequelize.INTEGER, allowNull: false },

  });

module.exports=group;
