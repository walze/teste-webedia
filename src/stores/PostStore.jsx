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

  constructor() {
    super()
    this.posts = []
  }

  get all() {
    api
      .get('posts')
      .then(posts => {
        this.posts = posts.data
        this.emit(EVENTS.NEW_POSTS, this.posts)
      })

    return this.posts
  }

  handleActions(action) {
    console.log('action', action)
  }
}

export const postStore = new PostStore()

dispatcher.register(postStore.handleActions.bind(postStore))