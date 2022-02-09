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
      name: String
      slug: String
    }
    
    type SubTaxonomy {
      id: Int
      name: String
      taxonomyId: Int
    }
    
    type Gallery {
      id: Int
      url: String
      productId: Int
    }
    
    type Highlight {
      id: Int
      name: String
      productId: Int
    }
    
    type Review {
      id: Int
      name: String
      email: String
      title: String
      review: String
      rating: Int
      productId: Int
    }
    
    type Spec {
      id: Int
      key: String
      value: String
      productId: Int
    }
    
    type Query {
      getProducts(categoryId: Int, subTaxonomy: [Int], limit: Int, offset: Int): CountProd
    }
`);
