const db = require('./DB')

function getCurrentDateTimeMySql() {
  var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
  var mySqlDT = localISOTime;
  return mySqlDT;
}

// fiz likes em uma tabela separada apenas mostrar meus conhecimentos de relações
// nesse caso em especifico, a contagem de likes poderia ficar na tabela de posts
module.exports = class Post {

  static get postPerReq() {
    return 4
  }

  static async all(limit) {

    const lmt = limit && limit !== '0' ? (limit * this.postPerReq + 1) : 0

    const q = `
      SELECT * 
      FROM \`posts\` as t1 
      LEFT JOIN \`likes\` as t2 
      ON t1.id = t2.post_id
      ORDER BY date DESC, id DESC
      LIMIT ${lmt}, ${this.postPerReq}
    `

    const [posts] = await db.conn.execute(q)

    return posts.map(post => new Post(post))
  }

  static async top5() {
    const q = `
    SELECT * 
    FROM \`posts\` as t1 
    LEFT JOIN \`likes\` as t2 
    ON t1.id = t2.post_id
    ORDER BY count DESC
    LIMIT 5
  `

    const [posts] = await db.conn.execute(q)

    return posts.map(post => new Post(post))
  }

  static async find(id) {
    const q = `
      SELECT * 
      FROM \`posts\` as t1
      LEFT JOIN \`likes\` as t2
      ON t1.id = t2.post_id
      WHERE id = ${id}
    `

    const [rows] = await db.conn.execute(q)
    const postData = rows[0]

    return postData ? new Post(postData) : null
  }

  static async delete(id) {
    const [rows] = await db.conn.execute(`DELETE FROM \`posts\` WHERE id = ${id}`)
    const [rows2] = await db.conn.execute(`DELETE FROM \`likes\` WHERE post_id = ${id}`)

    return {
      posts: rows,
      likes: rows2
    }
  }

  constructor(obj) {
    this.id = Number(obj.id) || null
    this.title = obj.title
    this.body = obj.body
    this.date = obj.date || getCurrentDateTimeMySql()
  this.author = obj.author
  this.count = obj.count || 0
}

dislike() {
  if (this.count <= 0) return

  this.count--
  return this._updateLike()
}

like() {
  this.count++
  return this._updateLike()
}

_updateLike() {
  const q = `
      UPDATE likes
      SET count = ${this.count}
      WHERE post_id = ${this.id}
    `

  return db.query(q)
}

save() {
  return this._newPost()
}

async _newPost() {
  // cria novo post
  const q = `
      INSERT INTO \`posts\` 
        (title, body, date, author)
      VALUES 
        ('${this.title}', '${this.body}', '${this.date}', '${this.author}')
    `

  const [res] = await db.query(q)
  this.id = res.insertId

  // cria novo like
  const q2 = `
      INSERT INTO \`likes\` 
        (post_id, count)
      VALUES 
        ('${this.id}', ${this.count})
    `

  db.query(q2)

  return res
}

}