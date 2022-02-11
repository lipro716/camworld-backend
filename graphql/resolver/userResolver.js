const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const User = require('../../models/User');
const generateToken = require('../../utils/generateToken');
const Role = require('../../models/Role');

module.exports = {
  Mutation: {
    async registerUser(root, {data}) {
      try {
        const user = await User.create({
          email: data.email,
          password: bcrypt.hashSync(data.password, 10),
        });
        const [role] = await Role.findOrCreate({where: {name: 'customer'}});
        await user.addRole(role.id);
        return {
          email: user.email,
          token: await generateToken(user.id),
        };
      } catch (e) {
        console.log(e);
        const messages = {};
        if (e instanceof Sequelize.ValidationError) {
          const message = [];
          if (e && e.errors && e.errors.length > 0) {
            e.errors.forEach((error) => {
              switch (error.validatorKey) {
                case 'isEmail':
                  message.push('Please enter a valid email');
                  break;
                case 'not_unique':
                  message.push('This email is already exist!');
              }
              messages[error.path] = message;
            });
          } else {
            message.push('Something went wrong!');
          }
          throw new Error(message.join(', '));
        }
      }
    },
  },
};