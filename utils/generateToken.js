const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
const User = require('../models/User');

const generateToken = async (id) => {
  const user = await User.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Role,
      },
    ],
  });
  return jwt.sign({id: user.id, email: user.email, roles: user.roles},
    process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
};

module.exports = generateToken;