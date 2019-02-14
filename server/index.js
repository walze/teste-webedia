// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'news_db'
})

connection.query(
  'SELECT 1 + 1 as solution',
  function (...args) {
    console.log(args)
  }
)