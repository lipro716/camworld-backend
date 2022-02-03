const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const SubTaxonomy = sequelize.define('sub-taxonomies', {
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
  taxonomyId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
}, { timestamps: false })

module.exports = SubTaxonomy