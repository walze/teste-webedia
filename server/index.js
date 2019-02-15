const DB = require('./Connection')

// create the connection to database
const db = new DB({
  host: 'localhost',
  user: 'root',
  database: 'news_db'
})

const app = require('express')();

app.get('/', async function (_, res) {
  const [result] = await db.query('SELECT 1+1 as sol')

  res.send(result);
});

app.listen(3000, function () {
  console.log('\nListening on port 3000...');
});