const Product = require('../../models/Product');
const Sequelize = require('sequelize');
const Category = require('../../models/Category');
const SubTaxonomy = require('../../models/SubTaxonomy');
const Op = Sequelize.Op;

module.exports = {
  Query: {
    async getProducts(root, {categoryId, subTaxonomy, limit, offset, sort}) {
      try {
        let category = {};
        let filters = {};
        let price = {};
        let order = [
          ['createdAt', 'DESC'],
        ];
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
        if (sort && sort.sortBy) {
          if (sort.sortBy === 'low_to_high') {
            order = [
              ['price', 'ASC'],
            ];
          } else if (sort.sortBy === 'high_to_low') {
            order = [
              ['price', 'DESC'],
            ];
          }
        }
        if (sort && sort.priceMin && sort.priceMax) {
          price = {
            price: {
              [Op.gte]: sort.priceMin,
              [Op.lte]: sort.priceMax,
            },
          };
        }
        return await Product.findAndCountAll({
          order,
          where: price,
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