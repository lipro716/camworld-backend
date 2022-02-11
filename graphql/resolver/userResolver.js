const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const User = require('../../models/User');
const generateToken = require('../../utils/generateToken');
const Role = require('../../models/Role');
const matchPassword = require('../../utils/matchPassword');

module.exports = {
  Mutation: {
    async registerUser(root, {data}) {
      try {
        data.email = data.email.trim();
        data.password = data.password.trim();
        const user = await User.create({
          email: data.email,
          password: await bcrypt.hashSync(data.password, 10).trim(),
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

    async loginUser(root, {data}) {
      const user = await User.findOne({
        where: {email: data.email},
      });
      user.password = user.password.trim();
      const password = data.password.trim();
      if (user && (await matchPassword(password, user.password))) {
        return {
          id: user.id,
          email: user.email,
          token: generateToken(user.id),
        };
      } else {
        throw new Error('Invalid email or password');
      }
    },

    async updateUser(root, {data}, {user}) {
      if (!user) throw new AuthenticationError('Unauthenticated');
      const findUser = await User.findByPk(user.id);
      if (data.password.trim()) {
        data.password = bcrypt.hashSync(input.password.trim(), 10);
      } else {
        delete data.password;
      }
      Object.assign(findUser, data);
      try {
        return await findUser.save();
      } catch (e) {
        const messages = {};
        if (e instanceof Sequelize.ValidationError) {
          const message = [];
          e.errors.forEach((error) => {
            switch (error.validatorKey) {
              case 'isEmail':
                message.push('Please enter a valid email');
                break;
              case 'not_unique':
                message.push('This email is exist!');
            }
            messages[error.path] = message;
          });
          throw new Error(message.join(', '));
        }
      }
    },
  },
};