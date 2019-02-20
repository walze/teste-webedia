const Post = require('./Post')

const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(function (_, rs, next) {
  rs.setHeader('Content-Type', 'application/json')
  rs.header("Access-Control-Allow-Origin", "*")
  rs.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  rs.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD")
  next()
})
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err)
});


// like/dislike
app.all('/like/:id', async (rq, rs) => {
  const post = await Post.find(rq.params.id)

  if (!post) return rs.status(404).send('404 Not Found').end()

  if (rq.method === 'GET')
    post.like()
  else if (rq.method === 'DELETE')
    post.dislike()

  rs.send(post)
})


// all posts
app.get('/posts', async (rq, rs) => {
  const { limit } = rq.query
  const posts = await Post.all(limit)
  const top5 = await Post.top5()

  rs.send({ posts, top5 })
})

// 1 post
app.get('/posts/:id', async (rq, rs) => {
  const post = await Post.find(rq.params.id)
  if (!post) return rs.status(404).send('404 Not Found').end()

  rs.send(post)
})

// delete post
app.delete('/posts/:id', async (rq, rs) => {
  const post = await Post.delete(rq.params.id)

  rs.send(post)
})

// add post
app.post('/posts', async (rq, rs) => {
  const post = new Post(rq.body)
  const result = await post.save()
  const { insertId } = result
  if (!insertId) return rs.status(500).send(result).end()

  const newPost = await Post.find(result.insertId)

  rs.send({ newPost, result, post })
})

app.listen(3001, function () {
  console.log('\nListening on port 3001...')
})