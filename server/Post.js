const db = require('./DB')

module.exports = class Post {

  static all() {
    return db.query('SELECT * FROM `posts`')
  }

  constructor(obj) {
    this.id = Number(obj.id)
    this.title = obj.title
    this.body = obj.body
    this.date = new Date(obj.date)
    this.author = obj.author
  }

  save() {
    const query = `
    INSERT INTO \`posts\` 
      (title, body, date, author)
    VALUES 
      ('${this.title}', '${this.body}', '${this.date}', '${this.author}')
    ;`

    const res = db.query(query)
      .then(([res]) => {
        this.id = res.insertId

        return res
      })

    return res
  }

}