const sequelize = require('../utils/database')

const ProductSubTaxonomy = sequelize.define('product_sub-taxonomy', {

}, { timestamps: false })

module.exports = ProductSubTaxonomy