const sequelize = require('../utils/database');

const ProductSubTaxonomy = sequelize.define('product_subTaxonomy', {},
  {timestamps: false});

module.exports = ProductSubTaxonomy;