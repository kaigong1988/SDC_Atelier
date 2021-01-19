const parser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes.js');
const ReviewsController = require('./controllers/reviews-controller.js');

const app = express();
const port = 3000;

// middleware
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + './client/dist'));
app.use(cors());

app.use('/', router);

app.listen(port, () => console.log(`listening on port ${port}!`));
