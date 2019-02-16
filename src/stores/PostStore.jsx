import dispatcher from '../Dispatcher'
import axios from 'axios'
import { EventEmitter } from 'events';
import { mobileStore } from './MobileStore';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: { 'Content-Type': 'application/json' }
});

export const EVENTS = {
  GET_POSTS: 'GET_POSTS',
  MORE_POSTS: 'MORE_POSTS',
}

class PostStore extends EventEmitter {

  _onScroll = (offset) => () => {
    const scroll = window.scrollY + window.outerHeight + offset
    const height = document.body.scrollHeight

    if (scroll >= height && !this.morePostsLock) {
      this.morePostsLock = true
      this.getMorePosts()
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

    let scrollIsOn = true
    window.addEventListener('scroll', scroll)

    mobileStore.onResize(mobile => {

      if (mobile && !scrollIsOn) {
        window.addEventListener('scroll', scroll)

      } else if (!mobile && scrollIsOn) {
        window.removeEventListener('scroll', scroll)

      }

    })

  }

  getMorePosts() {
    return api
      .get(`posts?limit=${this.limit++}`)
      .then(rs => {
        console.log('Recebendo mais posts...', rs.data.posts)
        this.data.posts = [...this.data.posts, ...rs.data.posts]
        this.emit(EVENTS.MORE_POSTS, this.data)
        this.morePostsLock = false

        return rs
      })
  }

  getPosts() {
    api
      .get(`posts`)
      .then(posts => {
        this.data = posts.data
        this.emit(EVENTS.GET_POSTS, this.data)
      })

    return this.data.posts
  }

  handleActions = action => {
    console.log('action', action)
  }
}

export const postStore = new PostStore()

dispatcher.register(postStore.handleActions)