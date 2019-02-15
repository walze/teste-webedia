module.exports = class Post {
  constructor(obj) {
    this.id = Number(obj.id)
    this.title = obj.title
    this.body = obj.body
    this.date = new Date(obj.date)
    this.author = obj.author
  }
}