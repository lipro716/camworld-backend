const Product = require('../../models/Product');
const Sequelize = require('sequelize');
const Category = require('../../models/Category');
const SubTaxonomy = require('../../models/SubTaxonomy');
const Taxonomy = require('../../models/Taxonomy');
const Op = Sequelize.Op;

module.exports = {
  Query: {
    async getCategories(root) {
      try {
        return await Category.findAll({
          order: [
            ['name', 'ASC'],
          ],
          include: [
            {
              model: Taxonomy,
              include: [
                {
                  model: SubTaxonomy,
                },
              ],
            },
          ],
        });
      } catch (e) {
        throw new Error('Fetch is not available');
      }
    },
  },
};