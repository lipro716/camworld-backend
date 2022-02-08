const sequelize = require('../utils/database');

const CategoryTaxonomy = sequelize.define('category_taxonomy', {},
  {timestamps: false});

module.exports = CategoryTaxonomy;