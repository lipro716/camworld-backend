const { buildSchema } = require('graphql')

module.exports = buildSchema(` 
    type Product {
      id: Int
      name: String
      slug: String
      image: String
      description: String
      price: Float
      categoryId: Int
      sku: String
      youtubeEmbed: String
      rating: Int
      numReviews: Int
    }
    
    type Query {
      getProducts: [Product]
    }
`)
