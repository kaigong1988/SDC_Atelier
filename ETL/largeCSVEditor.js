const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'product_id', title: 'product_id' },
    { id: 'rating', title: 'rating' },
    { id: 'date', title: 'date' },
    { id: 'summary', title: 'summary' },
    { id: 'body', title: 'body' },
    { id: 'recommend', title: 'recommend' },
    { id: 'reported', title: 'reported' },
    { id: 'reviewer_name', title: 'reviewer_name' },
    { id: 'reviewer_email', title: 'reviewer_email' },
    { id: 'response', title: 'response' },
    { id: 'helpfulness', title: 'helpfulness' },
  ],
});
let fileName = './review-sample.csv';
let readStream = fs.createReadStream('./reviews.csv');
let writeStream = fs.createWriteStream('./reviewscleanup.csv');

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, encoding, next) {
    if (chunk.recommend === true || chunk.recommend === 'true') {
      chunk.recommend = 1;
    } else if (chunk.recommend === 'false' || chunk.recommend === false) {
      chunk.recommend = 0;
    }
    if (chunk.reported === 'true' || chunk.reported === true) {
      chunk.reported = 1;
    } else if (chunk.reported === 'false' || chunk.reported === false) {
      chunk.reported = 0;
    }
    if (chunk.response.length === 0 || chunk.response === null) {
      chunk.response = 'null';
    }
    //uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);

    this.push(chunk);
    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

//write header
writeStream.write(csvStringifier.getHeaderString());

readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on('finish', () => {
    console.log('finished');
  });
