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
              required: false,
            },
            {
              all: true,
            },
          ],
          limit,
          offset,
          distinct: true,
        });
      } catch (e) {
        throw new Error('Fetch products is not available');
      }
    },
    async getProductById(root, {id}) {
      try {
        return await Product.findOne({
          where: {
            id,
          },
          include: [
            {
              all: true,
            },
          ],
        });
      } catch (e) {
        throw new Error(`Fetch product is not available. Error: ${e}`);
      }
    },
  },
};