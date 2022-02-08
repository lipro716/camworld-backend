const User = require('./User');
const Role = require('./Role');
const UserRole = require('./UserRole');
const Product = require('./Product');
const Category = require('./Category');
const Taxonomy = require('./Taxonomy');
const SubTaxonomy = require('./SubTaxonomy');
const ProductSubTaxonomy = require('./ProductSubTaxonomy');
const Gallery = require('./Gallery');
const Highlight = require('./Highlight');
const Review = require('./Review');
const Spec = require('./Spec');
const CategoryTaxonomy = require('./CategoryTaxonomy');

User.belongsToMany(Role, {
  hooks: true,
  through: UserRole,
});
Role.belongsToMany(User, {
  hooks: true,
  through: UserRole,
});
UserRole.belongsTo(User);
UserRole.belongsTo(Role);

Category.hasMany(Product, {foreignKey: 'categoryId', as: 'products'});
Product.belongsTo(Category);

Taxonomy.hasMany(SubTaxonomy, {foreignKey: 'taxonomyId', as: 'subTaxonomies'});
SubTaxonomy.belongsTo(Taxonomy);

Product.belongsToMany(SubTaxonomy, {
  hooks: false,
  through: ProductSubTaxonomy,
});
SubTaxonomy.belongsToMany(Product, {
  hooks: false,
  through: ProductSubTaxonomy,
});
ProductSubTaxonomy.belongsTo(Product);
ProductSubTaxonomy.belongsTo(SubTaxonomy);

Product.hasMany(Gallery, {foreignKey: 'productId', as: 'gallery'});
Gallery.belongsTo(Product);

Product.hasMany(Highlight, {foreignKey: 'productId', as: 'highlights'});
Highlight.belongsTo(Product);

Product.hasMany(Review, {foreignKey: 'productId', as: 'reviews'});
Review.belongsTo(Product);

Product.hasMany(Spec, {foreignKey: 'productId', as: 'specs'});
Spec.belongsTo(Product);

Taxonomy.belongsToMany(Category, {
  hooks: false,
  through: CategoryTaxonomy,
});
Category.belongsToMany(Taxonomy, {
  hooks: false,
  through: CategoryTaxonomy,
});
CategoryTaxonomy.belongsTo(Category);
CategoryTaxonomy.belongsTo(Taxonomy);