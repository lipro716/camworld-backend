const sequelize = require('../utils/database')

const CategoryProduct = sequelize.define('category_product', {

}, { timestamps: false })

module.exports = CategoryProduct