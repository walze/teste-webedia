const db = require('./DB')
const Post = require('./Post')

const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


app.get('/', async function (_, rs) {
  const [result] = await db.query('SELECT 1+1 as sol')
    .catch(rs.status(500).send.bind(rs))

  rs.send(result)
})

app.get('/posts', async (rq, rs) => {
  const [posts] = await Post.all()
    .catch(rs.status(500).send.bind(rs))

  rs.send(posts)
})

app.post('/posts', async (rq, rs) => {
  const post = new Post(rq.body)
  const result = await post.save()

  rs.send({
    post,
    result
  })
})

app.listen(3000, function () {
  console.log('\nListening on port 3000...')
})