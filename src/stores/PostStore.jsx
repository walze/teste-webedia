import dispatcher from '../dispatcher'
import axios from 'axios'
import { EventEmitter } from 'events'
import { mobileStore } from './MobileStore'
import EVENTS from '../events'
import { debounce } from './../helpers';

const headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
}

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers
})

const handleError = (...args) => {
  console.error(args)
  alert('Não foi possivel receber esse link')
}

const makePost = ({ title, description, site_name, image, link }) => ({
  title: title || 'Não Fornecido',
  description: description || 'Não Fornecido',
  site_name: site_name || 'Não Fornecido',
  image,
  link: link || 'Não Fornecido'
})



class PostStore extends EventEmitter {

  _onScroll = (offset) => () => {
    const scroll = window.scrollY + window.outerHeight + offset
    const height = document.body.scrollHeight

    if (scroll >= height && !this.morePostsLock) {
      console.log('More posts...')
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
    const offset = 600
    const scroll = this._onScroll(offset)

    let scrollIsOn = true

    const onScrollDebounce = debounce(scroll, 100)

    window.addEventListener('scroll', onScrollDebounce)

    mobileStore.onResize(mobile => {  

      if (mobile && !scrollIsOn) {
        window.addEventListener('scroll', onScrollDebounce)

      } else if (!mobile && scrollIsOn) {
        window.removeEventListener('scroll', onScrollDebounce)

      }

    })
  }

  _newPost = async url => {
    const post = await this.getMetaData(url)

    console.log(post)
    api
      .post('posts', post)
      // a api retorna o post adicionado
      // estou buscando todos os posts denovo só para nao ter que recalcular os top5 denovo
      // ou fazer uma 
      .then(() => this.getPosts())
      .catch(handleError)
  }

  _deletePost = async id => {


    api
      .delete(`posts/${id}`)
      .then(() => {
        this.getPosts()
      })
      .catch(handleError)
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
      .catch(handleError)

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
      .catch(handleError)
  }

  getPosts() {
    api
      .get(`posts`)
      .then(posts => {
        this.data = posts.data
        this.emit(EVENTS.GET_POSTS, this.data)
      })
      .catch(handleError)

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
        .catch(handleError)
    } else {

      api
        .get(`like/${id}`)
        .then(({ data }) => this._replacePost(data))
        .catch(handleError)

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