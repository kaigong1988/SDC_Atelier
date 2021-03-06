const router = require('express').Router();
const ReviewsController = require('./controllers/reviews-controller.js');
const { cacheReviews, cacheMeta } = require('./databases/redis_connection.js');

router.get('/reviews/?', cacheReviews, ReviewsController.getAll);
router.get('/reviews/meta/?', cacheMeta, ReviewsController.getMeta);
router.post('/reviews/?', ReviewsController.createRe);
router.put('/reviews/:review_id/helpful', ReviewsController.helpfulReview);
router.put('/reviews/:review_id/report', ReviewsController.reportReview);
router.get(
  '/loaderio-03c225c01dc1c89f4e72a4114a6e29b3/',
  ReviewsController.loaderTest
);
module.exports = router;
