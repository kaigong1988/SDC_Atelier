const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient({
  // host: 'redis',
  port: REDIS_PORT,
});

client.on('connect', () => {
  console.log(`Connected to Redis on port ${REDIS_PORT}!`);
});

const cacheReviews = (req, res, next) => {
  const reviewResults = JSON.stringify(req.query);
  client.get(reviewResults, (error, data) => {
    if (error) {
      throw error;
    }
    if (data !== null) {
      let result = JSON.parse(data);
      res.json(result);
    } else {
      next();
    }
  });
};

const cacheMeta = (req, res, next) => {
  const { product_id } = req.query;
  client.get(`${product_id}`, (error, data) => {
    if (error) {
      throw error;
    }
    if (data !== null) {
      let result = JSON.parse(data);
      res.json(result);
    } else {
      next();
    }
  });
};

module.exports = { client, cacheReviews, cacheMeta };
