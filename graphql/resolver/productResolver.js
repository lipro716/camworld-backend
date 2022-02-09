const Product = require('../../models/Product');

module.exports = {
  Query: {
    async getProducts() {
      try {
        const tmp = await Product.findAll({
          order: [
            ['createdAt', 'DESC'],
          ],
          include: [
            {
              all: true,
            },
          ],
        });
        console.log(tmp);
        return tmp
      } catch (e) {
        throw new Error('Fetch products is not available');
      }
    },
  },
};