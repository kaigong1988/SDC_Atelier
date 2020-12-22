const fs = require('fs');
const csv = require('csvtojson');
const { Parser } = require('json2csv');

(async () => {
  const fileName = 'review-sample.csv';
  const reviews = await csv().fromFile(fileName);
  for (item of reviews) {
    if (item.recommend === true || item.recommend === 'true') {
      item.recommend = 1;
    } else if (item.recommend === 'false' || item.recommend === false) {
      item.recommend = 0;
    }
    if (item.reported === 'true' || item.reported === true) {
      item.reported = 1;
    } else if (item.reported === 'false' || item.reported === false) {
      item.reported = 0;
    }
    if (item.response.length === 0 || item.response === null) {
      item.response = 'null';
    }
  }
  const reviewsInCsv = new Parser({
    fields: [
      'id',
      'product_id',
      'rating',
      'date',
      'summary',
      'body',
      'recommend',
      'reported',
      'reviewer_name',
      'reviewer_email',
      'response',
      'helpfulness',
    ],
  }).parse(reviews);
  fs.writeFileSync(fileName, reviewsInCsv);
})();
