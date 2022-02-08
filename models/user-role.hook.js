const {getRoleByName} = require('../graphql/resolver/roleResolver');
exports.hooks = {
  afterCreate: (User, payload) => {
    AddUserRole(User, payload);
  },
};

function AddUserRole(User) {
  const role = getRoleByName('customer');
  User.addRole(role.id);
}