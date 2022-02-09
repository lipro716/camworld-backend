const Product = require('../../models/Product');
const Sequelize = require('sequelize');
const Category = require('../../models/Category');
const SubTaxonomy = require('../../models/SubTaxonomy');
const Op = Sequelize.Op;

module.exports = {
  Query: {
    async getProducts(root, {categoryId, subTaxonomy, limit, offset}) {
      try {
        let args = {};
        let category = {};
        let filters = {};
        if (categoryId) {
          category = {
            id: categoryId,
          };
        }
        if (subTaxonomy) {
          filters = {
            id: {
              [Op.or]: subTaxonomy,
            },
          };
        }
        args = {
          order: [
            ['createdAt', 'DESC'],
          ],
          include: [
            {
              model: Category,
              where: category,
            },
            {
              model: SubTaxonomy,
              where: filters,
            },
            {
              all: true,
            },
          ],
          limit: limit,
          offset: offset,
          distinct: true,
        };
        return await Product.findAndCountAll({args});
      } catch (e) {
        throw new Error('Fetch products is not available');
      }
    },
  },
};