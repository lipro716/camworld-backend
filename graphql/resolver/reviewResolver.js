const Product = require('../../models/Product');
const Review = require('../../models/Review');

module.exports = {
  Mutation: {
    async addReview(root, {data}) {
      try {
        const review = await Review.create({
          name: data.name,
          email: data.email,
          title: data.title,
          review: data.review,
          rating: data.rating,
          productId: data.productId,
        });
        const product = await Product.findOne({
          where: {id: data.productId}, include: [{model: Review}],
        });
        const reviews = product.reviews;
        product.rating = calcMiddleReviewValue(reviews);
        product.numReviews = reviews.length;
        await product.save();
        return review;
      } catch (e) {
        throw new Error('Something went wrong, please try again later');
      }
    },
  },
};

const calcMiddleReviewValue = (reviews) => {
  const ratingArray = [];
  const ratingLength = reviews.length;

  reviews.map(item => {
    ratingArray.push(item.rating);
  });

  if (ratingArray.length !== 0) {
    const allRatingValue = ratingArray.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });
    return Math.ceil(allRatingValue / ratingLength);

  }
};