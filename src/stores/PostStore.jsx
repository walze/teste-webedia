import dispatcher from '../Dispatcher'
import axios from 'axios'
import { EventEmitter } from 'events';

const api = axios.create({
  baseURL: 'http://localhost:3001/'
});

export const EVENTS = {
  NEW_POSTS: 'NEW_POSTS',
}

class PostStore extends EventEmitter {

  _onScroll = (offset) => () => {
    const scroll = window.scrollY + window.outerHeight + offset
    const height = document.body.scrollHeight

    if (scroll >= height && !this.morePostsLock) {
      this.morePostsLock = true
      this.getMorePosts(++this.limit)
    }
  }

  constructor() {
    super()
    this.data = {
      posts: [],
      top5: []
    }
    this.limit = 1
    this.morePostsLock = false

    this._infiniteScroll()

    console.log(this)
  }

  _infiniteScroll() {
    const offset = 100
    const scroll = this._onScroll(offset)

    window.addEventListener('scroll', scroll)
  }

  getMorePosts(limit) {
    api
      .get(`posts?limit=${limit}`)
      .then(posts => {
        this.data.posts = [...this.data.posts, ...posts.data.posts]
        this.emit(EVENTS.NEW_POSTS, this.data)
        this.morePostsLock = false
      })

    return this.data.posts
  }

  getPosts() {
    api
      .get(`posts`)
      .then(posts => {
        this.data = posts.data
        this.emit(EVENTS.NEW_POSTS, this.data)
      })

    return this.data.posts
  }

  handleActions = action => {
    console.log('action', action)
  }
}

export const postStore = new PostStore()

dispatcher.register(postStore.handleActions)