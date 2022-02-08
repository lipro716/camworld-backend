const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Highlight = sequelize.define('highlight', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
}, {timestamps: false});

module.exports = Highlight;