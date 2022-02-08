const Taxonomy = require('../../models/Taxonomy');
const SubTaxonomy = require('../../models/SubTaxonomy');

module.exports = {
  async createTaxonomy(dto) {
    return await Taxonomy.create({
      name: dto.name,
    });
  },

  async createSubTaxonomy(dto) {
    return await SubTaxonomy.create({
      name: dto.name,
      taxonomyId: dto.taxonomyId,
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