const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'review_id', title: 'review_id' },
    { id: 'photos', title: 'photos' },
  ],
});
let fileName = './review-sample.csv';
let readStream = fs.createReadStream('./reviews_photos_sample.csv');
let writeStream = fs.createWriteStream('./reviews_photos_sample_cleanup.csv');

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, encoding, next) {
    //uses our csvStringifier to turn our chunk into a csv string
    // chunk = csvStringifier.stringifyRecords([chunk]);
    var result = chunk;
    result.url = [{ id: chunk.id, url: chunk.url }];
    var prevChunk = chunk;
    next();
    while (chunk.review_id === prevChunk.review_id) {
      prevChunk = chunk;
      result.url.push({ id: chunk.id, url: chunk.url });
      next();
    }
    console.log(result);
    next();
    // this.push(chunk);
    // next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

//write header
writeStream.write(csvStringifier.getHeaderString());

readStream
  .pipe(csv())
  .pipe(transformer)
  // .pipe(writeStream)
  .on('finish', () => {
    console.log('finished');
  });
