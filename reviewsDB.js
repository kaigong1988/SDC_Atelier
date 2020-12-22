var mysql = require('mysql2');
var MYSQL_PW = require('./config.js');

const reviews_dbConnection = mysql.createConnection({
  user: 'root',
  password: MYSQL_PW,
  database: 'SDC_catwalk',
});

reviews_dbConnection.connect(function (err) {
  if (err) {
    console.log('theres an error: ', err);
  } else {
    console.log('connected!');
  }
});

module.exports = reviews_dbConnection;
