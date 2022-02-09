const {mergeResolvers} = require('@graphql-tools/merge');
const productResolver = require('./productResolver');
const categoryResolver = require('./categoryResolver');

const resolvers = [
  productResolver,
  categoryResolver,
];

module.exports = mergeResolvers(resolvers);