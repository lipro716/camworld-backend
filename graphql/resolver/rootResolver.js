const {mergeResolvers} = require('@graphql-tools/merge');
const productResolver = require('./productResolver');
const categoryResolver = require('./categoryResolver');
const reviewResolver = require('./reviewResolver');

const resolvers = [
  productResolver,
  categoryResolver,
  reviewResolver
];

module.exports = mergeResolvers(resolvers);