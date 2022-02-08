const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Gallery = sequelize.define('gallery', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
}, {timestamps: false});

module.exports = Gallery;