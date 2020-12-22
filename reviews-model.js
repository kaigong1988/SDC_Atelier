const reviewDb = require('./reviewsDB.js');

module.exports = {
  getAllReviews: function (params, callback) {
    const row = (Number(params.page) - 1) * Number(params.count);
    const count = params.count;
    const queryStr = `SELECT * ,
    (select JSON_ARRAYAGG(JSON_object('id', review_photos.id, 'url', review_photos.url))
    FROM review_photos
    where review_photos.review_id = reviews.id) as photos
    from reviews
    WHERE reviews.product_id=${params.product_id}
    ORDER BY ${params.sort} DESC
    LIMIT ${row},${count}`;

    reviewDb.query(queryStr, function (err, results) {
      if (err) {
        console.log(err, params, row, params.count, Number(params.page));
      } else {
        // for (item of results) {
        //   console.log(item);
        //   item.photos = JSON.parse(item.photos);
        // }
        callback(err, results);
      }
    });
  },
  // create: function (params, callback) {
  //   // create a message for a user id based on the given username
  //   var queryStr1 =
  //     'insert into reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) \
  //                   value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
  //   var reviewId = db.query(`select reviews.id from reviews where reviews.`);
  //   db.query(queryStr1, params, function (err, results) {
  //     callback(err, results);
  //   });
  //   if (
  //     params.photos !== undefined &&
  //     Array.isArray(params.photos) &&
  //     params.photos.length > 0
  //   ) {
  //     var queryStr2 = ``;
  //     for (item of params.photos) {
  //       queryStr2 =
  //         queryStr2 +
  //         `insert into review_photos(review_id, url) \
  //                               value (11, ${item})`;
  //     }
  //   }
  // }, // a function which can be used to insert a message into the database
  createReview: function (params, callback) {
    let date = new Date().toISOString().slice(0, 10);
    // create a message for a user id based on the given username
    var queryStr = `insert into reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
       values (?, ?, ${JSON.stringify(date)}, ?, ?, ?, 0, ?, ?, null, 0)`;
    reviewDb.query(queryStr, params, function (err, results) {
      callback(err, results);
    });
  },
  getAllMeta: function (params, callback) {
    var queryStr = `select (JSON_ARRAYAGG(rating))AS ratings,
      sum(recommend) AS recommended,
      (SELECT json_objectagg((select characteristics.name from characteristics where characteristics.id = characteristic_reviews.characteristic_id) ,JSON_object('id', characteristic_reviews.id, 'value', characteristic_reviews.value))
      from characteristic_reviews
      where characteristic_reviews.review_id = reviews.id) AS characteristics
      from reviews WHERE reviews.product_id=${params.product_id};`;

    reviewDb.query(queryStr, function (err, results) {
      if (err) {
        console.log(err);
      } else {
        for (item of results) {
          item.characteristics = JSON.parse(item.characteristics);
        }

        callback(err, results);
      }
    });
  },
};

// unfinished query for review metadata
/*
SELECT product_id,
(select JSON_ARRAYAGG(rating)
FROM reviews
WHERE reviews.product_id= 2) AS ratings,
(select sum(recommend) FROM reviews
WHERE reviews.product_id= 2) AS recommended,
(select JSON_ARRAYAGG(JSON_object(
  JSON_ARRAYAGG(JSON_object('id', (select characteristics.id from characteristics where characteristics.product_id=2) ,
  'value', (characteristic_reviews.value from characteristic_reviews where characteristic_reviews.characteristic_id = characteristics.id))
  AS (SELECT characteristics.name FROM characteristics WHERE characteristics.product_id=2)))))
  AS 'characteristics' from characteristics where characteristics.product_id=2,
from reviews
WHERE reviews.product_id=2;
*/
/*
SELECT JSON_object('id', characteristic_reviews.id, 'value', characteristic_reviews.value) from characteristic_reviews where characteristic_reviews.review_id = 1;
*/
