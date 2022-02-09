const {buildSchema} = require('graphql');

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
      category: Category
      subTaxonomies: [SubTaxonomy]
      galleries: [Gallery]
      highlights: [Highlight]
      reviews: [Review]
      specs: [Spec]
    }
    
    type CountProd {
      rows: [Product]
      count: Int
    }
    
    type Category {
      id: Int
    }
    
    type SubTaxonomy {
      id: Int
    }
    
    type Gallery {
      id: Int
    }
    
    type Highlight {
      id: Int
    }
    
    type Review {
      id: Int
    }
    
    type Spec {
      id: Int
    }
    
    type Query {
      getProducts(categoryId: Int, subTaxonomy: [Int], limit: Int, offset: Int): CountProd
    }
`);
