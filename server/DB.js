const mysql = require('mysql2')

class DB {

  constructor() {
    this.mysql = mysql
    this._conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'news_db'
    })
  }

  get format() {
    return mysql.format.bind(mysql)
  }

  get connCB() {
    return this._conn
  }

  get conn() {
    const conn = this._conn
    const promise = conn.promise()

    return promise
  }

  /**
   * @type { (query: string, ...params: any[]) => Promise }
   */
  get query() {
    const conn = this.conn
    return conn.query.bind(conn)
  }

}

const db = new DB({
  host: 'localhost',
  user: 'root',
  database: 'news_db'
})

module.exports = db