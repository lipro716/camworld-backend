const User = require('./User')
const Role = require('./Role')
const UserRole = require('./UserRole')

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

