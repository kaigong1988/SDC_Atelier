const {
  getAllReviews,
  getAllMeta,
  createReview,
} = require('./reviews-model.js');

module.exports = {
  getAll: (req, res) => {
    getAllReviews(req.query, (err, result) => {
      if (err) {
        console.log('failed');
        res.sendStatus(500);
      } else {
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
  loaderTest: (req, res) => {
    res.send('loaderio-03c225c01dc1c89f4e72a4114a6e29b3');
  },
};
