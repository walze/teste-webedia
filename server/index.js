const Post = require('./Post')

const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


// like/dislike
app.all('/like/:id', async (rq, rs) => {
  const post = await Post.find(rq.params.id)
    .catch(rs.status(500).send.bind(rs))

  if (rq.method === 'GET')
    post.like()
  else if (rq.method === 'DELETE')
    post.dislike()

  rs.send(post)
})


// all posts
app.get('/posts', async (rq, rs) => {
  const posts = await Post.all()
    .catch(rs.status(500).send.bind(rs))

  rs.send(posts)
})

// 1 post
app.get('/posts/:id', async (rq, rs) => {
  const post = await Post.find(rq.params.id)
    .catch(rs.status(500).send.bind(rs))

  rs.send(post)
})

// delete post
app.delete('/posts/:id', async (rq, rs) => {
  const post = await Post.delete(rq.params.id)
    .catch(rs.status(500).send.bind(rs))

  rs.send(post)
})

// add post
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