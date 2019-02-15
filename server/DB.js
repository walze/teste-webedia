const mysql = require('mysql2');

class DB {

  constructor() {
    this._createConn = () => mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'news_db'
    })
  }

  get connCB() {
    return this._createConn()
  }

  get conn() {
    return this._createConn().promise()
  }

  get query() {
    const conn = this.conn
    return conn.query.bind(conn)
  }

}

module.exports = DB