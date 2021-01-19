const {
  getAllReviews,
  getAllMeta,
  createReview,
  markHelpful,
  markReport,
} = require('../models/reviews-model.js');

const redisClient = require('../databases/redis_connection.js').client;

module.exports = {
  getAll: (req, res) => {
    getAllReviews(req.query, (err, result) => {
      if (err) {
        console.log('failed');
        res.sendStatus(500);
      } else {
        redisClient.setex(
          JSON.stringify(req.query),
          3600,
          JSON.stringify(result)
        );
        res.json(result);
      }
    });
  },
  getMeta: (req, res) => {
    getAllMeta(req.query, (err, result) => {
      if (err) {
        console.log('failed');
        res.sendStatus(500);
      } else {
        redisClient.setex(
          `${req.query.product_id}`,
          3600,
          JSON.stringify(result)
        );
        res.json(result);
      }
    });
  },
  createRe: (req, res) => {
    const params = [
      req.query.product_id,
      req.query.rating,
      req.query.summary,
      req.query.body,
      req.query.recommend,
      req.query.reviewer_name,
      req.query.reviewer_email,
    ];
    createReview(params, (err, result) => {
      if (err) {
        console.log('failed', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  },
  helpfulReview: (req, res) => {
    markHelpful(req.params.review_id, (error, result) => {
      if (error) {
        console.log('Error with updating helpful review', error);
      } else {
        res.send();
      }
    });
  },

  reportReview: (req, res) => {
    markReport(req.params.review_id, (error, result) => {
      if (error) {
        console.log('Error with reporting review: ', error);
      } else {
        res.send();
      }
    });
  },
  loaderTest: (req, res) => {
    res.send('loaderio-03c225c01dc1c89f4e72a4114a6e29b3');
  },
};
