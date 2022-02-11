const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Description = sequelize.define('description', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  value: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  productId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
}, {timestamps: false});

module.exports = Description;