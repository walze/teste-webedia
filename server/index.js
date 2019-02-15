const DB = require('./DB')
const Post = require('./Post')

// create the connection to database
const db = new DB({
  host: 'localhost',
  user: 'root',
  database: 'news_db'
})

const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', async function (_, res) {
  const [result] = await db.query('SELECT 1+1 as sol')

  res.send(result)
})

app.get('/posts', async (rq, rs) => {
  const [posts] = await db.query('SELECT * FROM `posts`')
  rs.send(posts)
})

app.post('/posts', async (rq, rs) => {
  const [posts] = await db.query('SELECT * FROM `posts`')
  const post = new Post(posts[0])

  rs.send({
    posts,
    post
  })
})

app.listen(3000, function () {
  console.log('\nListening on port 3000...')
})