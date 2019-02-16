const Post = require('./Post')

const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// like/dislike
app.all('/like/:id', async (rq, rs) => {
  const post = await Post.find(rq.params.id)
    .catch((...args) => rs.status(500).send(args))

  if (rq.method === 'GET')
    post.like()
  else if (rq.method === 'DELETE')
    post.dislike()

  rs.send(post)
})


// all posts
app.get('/posts', async (rq, rs) => {
  const { start } = rq.query
  const posts = await Post.all(start)
    .catch((...args) => rs.status(500).send(args))

  const top5 = await Post.top5()
    .catch((...args) => rs.status(500).send(args))

  rs.send({ posts, top5 })
})

// 1 post
app.get('/posts/:id', async (rq, rs) => {
  const post = await Post.find(rq.params.id)
    .catch((...args) => rs.status(500).send(args))

  rs.send(post)
})

// delete post
app.delete('/posts/:id', async (rq, rs) => {
  const post = await Post.delete(rq.params.id)
    .catch((...args) => rs.status(500).send(args))

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

app.listen(3001, function () {
  console.log('\nListening on port 3001...')
})