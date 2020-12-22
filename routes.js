const router = require('express').Router();
const ReviewsController = require('./reviews-controller.js');

// routing for Questions & Answers

// routing for Reviews
router.get('/reviews/?', ReviewsController.getAll);
router.get('/reviews/meta/?', ReviewsController.getMeta);
router.get(
  '/loaderio-03c225c01dc1c89f4e72a4114a6e29b3/',
  ReviewsController.loaderTest
);
router.post('/reviews/?', ReviewsController.createRe);
module.exports = router;
