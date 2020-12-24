const reviewDb = require('../databases/reviewsDB.js');

module.exports = {
  getAllReviews: function (params, callback) {
    const row = (Number(params.page) - 1) * Number(params.count);
    const count = params.count;
    const queryStr = `SELECT * ,
    (select JSON_ARRAYAGG((JSON_object('id', review_photos.id, 'url', review_photos.url)))
    FROM review_photos
    where review_photos.review_id = reviews.id) as photos
    from reviews
    WHERE reviews.product_id=${params.product_id}
    ORDER BY ${params.sort} DESC
    LIMIT ${row},${count}`;

    reviewDb.query(queryStr, function (err, results) {
      if (err) {
        console.log(err);
      } else {
        callback(err, results);
      }
    });
  },
  createReview: function (params, callback) {
    let date = new Date().toISOString().slice(0, 10);
    // create a message for a user id based on the given username
    var queryStr = `insert into reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
       values (?, ?, ${JSON.stringify(date)}, ?, ?, ?, 0, ?, ?, null, 0)`;
    reviewDb.query(queryStr, params, function (err, results) {
      callback(err, results);
    });
  }, // a function which can be used to insert a message into the database

  // a function that will extract all the metadatas from database
  getAllMeta: function (params, callback) {
    var queryStr = `select (JSON_ARRAYAGG(rating))AS ratings,
      sum(recommend) AS recommended,
      (SELECT json_objectagg((select characteristics.name from characteristics where characteristics.id = characteristic_reviews.characteristic_id) ,JSON_object('id', characteristic_reviews.id, 'value', characteristic_reviews.value))
      from characteristic_reviews
      where characteristic_reviews.review_id = reviews.id) AS characteristics
      from reviews WHERE reviews.product_id=${params.product_id}`;

    reviewDb.query(queryStr, function (err, results) {
      if (err) {
        console.log(err);
      } else {
        callback(err, results);
      }
    });
  },
  markHelpful: function (review_id, callback) {
    const queryStr = `UPDATE reviews\
     SET helpfulness = helpfulness + 1\
     WHERE id = ${review_id};`;
    reviewDb.query(queryStr, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        callback(null, result);
      }
    });
  },
  markReport: function (review_id, callback) {
    const queryStr = `UPDATE reviews\
     SET reported = 1\
     WHERE id = ${review_id};`;
    reviewDb.query(queryStr, (error, result) => {
      if (error) {
        console.log('Error with reportQuestions query: ', error);
      } else {
        callback(null, result);
      }
    });
  },
};
