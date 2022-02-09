const Taxonomy = require('../models/Taxonomy');
const SubTaxonomy = require('../models/SubTaxonomy');

const self = module.exports = {
  async createTaxonomy(dto) {
    return await Taxonomy.create({
      name: dto.name,
    });
  },

  async getTaxonomy(dto) {
    return await Taxonomy.findOne({
      where: {
        name: dto.name,
      },
    });
  },

  async createSubTaxonomy(dto) {
    const taxonomy = await self.getTaxonomy({name: dto.taxonomy});
    return await SubTaxonomy.create({
      name: dto.name,
      taxonomyId: taxonomy.id,
    });
  },

  async getSubTaxonomy(dto) {
    return await SubTaxonomy.findOne({
      where: {
        name: dto.name,
      },
    });
  },
};