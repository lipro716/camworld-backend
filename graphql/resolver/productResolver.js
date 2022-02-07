const Gallery = require('../../models/Gallery');
const Highlight = require('../../models/Highlight');
const Spec = require('../../models/Spec');
const Product = require('../../models/Product');
const {generateProductSlug} = require('../../utils/helpers');

const self = module.exports = {
  async createProduct(dto) {
    const product = await Product.create({
      name: dto.name,
      slug: await generateProductSlug(dto.name, '/product/'),
      image: dto.image,
      description: dto.description,
      sku: dto.sku,
      youtubeEmbed: dto.youtubeEmbed,
      price: dto.price,
      categoryId: dto.categoryId,
      rating: dto.rating,
      numReviews: dto.numReviews,
    });
    if (dto.gallery) {
      for await (let item of dto.gallery) {
        await self.addNewGalleryImage({url: item, productId: product.id});
      }
    }
    if (dto.highlights) {
      for await (let item of dto.highlights) {
        await self.addNewHighlight({name: item, productId: product.id});
      }
    }
    if (dto.specs) {
      for await (let item of dto.specs) {
        await self.addNewSpec({key: item.key, value: item.value, productId: product.id});
      }
    }
  },

  async addNewGalleryImage(dto) {
    return await Gallery.create({
      url: dto.url,
      productId: dto.productId,
    });
  },

  async addNewHighlight(dto) {
    return await Highlight.create({
      name: dto.name,
      productId: dto.productId,
    });
  },

  async addNewSpec(dto) {
    return await Spec.create({
      key: dto.key,
      value: dto.value,
      productId: dto.productId,
    });
  },
};