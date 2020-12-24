const mysql = require('mysql2');
const MYSQL_PW = require('../../config.js');

// const reviews_dbConnection = mysql.createConnection({
//   user: 'root',
//   password: MYSQL_PW,
//   database: 'SDC_catwalk',
//   host: 'mysql1',
//   port: '3306',
// });

// reviews_dbConnection.connect(function (err) {
//   if (err) {
//     console.log('theres an error: ', err);
//   } else {
//     console.log('connected!');
//   }
// });

/** creating connection pool  **/

reviews_dbConnection = mysql.createPool({
  user: 'root',
  password: MYSQL_PW,
  database: 'SDC_catwalk',
  // host: 'mysql1',
  // port: '3306',
  connectionLimit: 10,
});

reviews_dbConnection.getConnection(function (error) {
  if (error) {
    console.log('Error connecting to Questions_Db: ', error);
  } else {
    console.log('Connected to Questions Db!');
  }
});

module.exports = reviews_dbConnection;
