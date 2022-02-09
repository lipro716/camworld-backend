const Product = require('../../models/Product');
const Sequelize = require('sequelize');
const Category = require('../../models/Category');
const SubTaxonomy = require('../../models/SubTaxonomy');
const Op = Sequelize.Op;

module.exports = {
  Query: {
    async getProducts(root, {categoryId, subTaxonomy, limit, offset}) {
      try {
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
        return await Product.findAndCountAll({
          order: [
            ['id', 'DESC'],
          ],
          include: [
            {
              model: Category,
              where: category,
            },
            {
              model: SubTaxonomy,
              where: filters,
              required: false,
            },
            {
              all: true,
            },
          ],
          limit: limit,
          offset: offset,
          distinct: true,
        });
      } catch (e) {
        throw new Error('Fetch products is not available');
      }
    },
  },
};