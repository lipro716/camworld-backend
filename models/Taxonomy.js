const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Taxonomy = sequelize.define('taxonomy', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
}, {timestamps: false});

module.exports = Taxonomy;