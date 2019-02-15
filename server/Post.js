const db = require('./DB')

// fiz likes em uma tabela separada apenas mostrar meus conhecimentos de relações
// nesse caso em especifico, a contagem de likes poderia ficar na tabela de posts
module.exports = class Post {

  static async all() {
    const q = `
      SELECT * 
      FROM \`posts\` as t1 
      LEFT JOIN \`likes\` as t2 
      ON t1.id = t2.post_id
      ORDER BY date DESC
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

    return new Post(rows[0])
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
    this.date = obj.date || new Date().toISOString()
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
    ;`

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