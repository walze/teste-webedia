import dispatcher from '../dispatcher'
import axios from 'axios'
import { EventEmitter } from 'events'
import { mobileStore } from './MobileStore'
import EVENTS from '../events'

const headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
}

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers
})

const makePost = ({
  title,
  description,
  site_name,
  image,
  link
}) => ({
  title,
  description,
  site_name,
  image,
  link
})



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
      top5: [],
    }
    this.likedPosts = JSON.parse(window.localStorage.getItem('LIKED_POSTS')) || []
    this.limit = 0
    this.morePostsLock = false

    this._infiniteScroll()

    console.log(this)
  }

  _infiniteScroll() {
    const offset = 400
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

  _newPost = async url => {
    const post = await this.getMetaData(url)

    console.log(post)
    api
      .post('posts', post)
      .then(({ data }) => {
        const newArr = [...this.data.posts]
        newArr.unshift(data)

        this.data.posts = newArr
        this.emit(EVENTS.MORE_POSTS, this.data)
      })
      .catch(console.warn)
  }

  _deletePost = async id => {


    api
      .delete(`posts/${id}`)
      .then(() => {
        this.getPosts()
      })
      .catch(console.warn)
  }

  getMetaData(url) {
    return axios
      .get(`https://cors-anywhere.herokuapp.com/${url}`, { headers })
      .then(({ data }) => {
        const el = document.createElement('html')
        el.innerHTML = data

        const obj = {
          link: url
        }

        Array
          .from(el.querySelectorAll('meta'))
          .map(meta => {
            const { content } = meta

            return {
              name: meta.getAttribute('property'),
              content
            }
          })
          .filter(a => a.name && a.name.match(/og:.+/))
          .map(meta => {
            const name = meta.name.replace('og:', '')

            return obj[name] = meta.content
          })

        return makePost(obj)
      })
  }

  getMorePosts() {
    return api
      .get(`posts?limit=${++this.limit}`)
      .then(rs => {
        console.log('Recebendo mais posts...', rs.data.posts)
        this.data.posts = [...this.data.posts, ...rs.data.posts]
        this.emit(EVENTS.MORE_POSTS, this.data)
        this.morePostsLock = false

        return rs
      })
      .catch(console.error)
  }

  getPosts() {
    api
      .get(`posts`)
      .then(posts => {
        this.data = posts.data
        this.emit(EVENTS.GET_POSTS, this.data)
      })
      .catch(console.error)

    return this.data.posts
  }

  checkIfLiked = id => this.likedPosts.includes(id)

  like(id) {
    const alreadyLiked = this.checkIfLiked(id)

    if (alreadyLiked) {
      this.likedPosts = this.likedPosts.filter(p => p !== id)

      api
        .delete(`like/${id}`)
        .then(({ data }) => this._replacePost(data))
        .catch(console.error)
    } else {

      api
        .get(`like/${id}`)
        .then(({ data }) => this._replacePost(data))
        .catch(console.error)

      this.likedPosts.push(id)
    }

    window.localStorage.setItem('LIKED_POSTS', JSON.stringify(this.likedPosts))
  }

  _replacePost(post) {
    this.data.posts = this.data.posts.map(p => {
      if (post.id === p.id)
        return post
      else
        return p
    })

    this.emit(EVENTS.GET_POSTS, this.data)
  }

  /**
   * @type { (action: {type: string, payload: any}) => void}
   */
  handleActions = ({ type, payload }) => {
    console.log('action', { type, payload })

    switch (type) {
      case EVENTS.LIKE:
        this.like(payload.id)
        break
      case EVENTS.NEW_POST:
        this._newPost(payload)
        break
      case EVENTS.DELETE_POST:
        this._deletePost(payload.id)
        break

      default:
        break
    }
  }
}

export const postStore = new PostStore()

dispatcher.register(postStore.handleActions)