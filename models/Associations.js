const User = require('./User')
const Role = require('./Role')
const UserRole = require('./UserRole')
const CategoryProduct = require('./CategoryProduct')
const Product = require('./Product')
const Category = require('./Category')

User.belongsToMany(Role, {
    hooks: true,
    through: UserRole,
})
Role.belongsToMany(User, {
    hooks: true,
    through: UserRole,
})
UserRole.belongsTo(User)
UserRole.belongsTo(Role)

Category.belongsToMany(Product, {
    hooks: false,
    through: CategoryProduct,
})
Product.belongsToMany(Category, {
    hooks: false,
    through: CategoryProduct,
})
UserRole.belongsTo(User)
UserRole.belongsTo(Role)
