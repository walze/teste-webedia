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


// like/dislike
app.all('/like/:id', async (rq, rs) => {
  const post = await Post.find(rq.params.id)
    .catch((...args) => {
      rs.status(403).send(args).end()
    })

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
    .catch((...args) => {
      rs.status(403).send(args).end()
    })

  const top5 = await Post.top5()
    .catch((...args) => {
      rs.status(403).send(args).end()
    })

  rs.send({ posts, top5 })
})

// 1 post
app.get('/posts/:id', async (rq, rs) => {
  const post = await Post.find(rq.params.id)
    .catch((...args) => {
      rs.status(403).send(args).end()
    })

  rs.send(post)
})

// delete post
app.delete('/posts/:id', async (rq, rs) => {
  const post = await Post.delete(rq.params.id)
    .catch((...args) => {
      rs.status(403).send(args).end()
    })

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