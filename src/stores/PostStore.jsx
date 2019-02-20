import dispatcher from '../Dispatcher'
import axios from 'axios'
import { EventEmitter } from 'events'
import EVENTS from '../events'

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
  alert('Houve algum erro')
}

const makePost = ({ title, description, site_name, image, link }) => ({
  title: title,
  description: description,
  site_name: site_name || 'Não Fornecido',
  image,
  link,
})



class PostStore extends EventEmitter {

  constructor() {
    super()
    this.data = {
      posts: [],
      top5: [],
    }
    this.likedPosts = JSON.parse(window.localStorage.getItem('LIKED_POSTS')) || []
    this.limit = 0

    console.log(this)
  }

  _newPost = async url => {
    this.emit(EVENTS.LOADING(EVENTS.NEW_POST), true)

    const post = await this.getMetaData(url)
    console.log(post)

    api
      .post('posts', post)
      // a api retorna o post adicionado
      // estou buscando todos os posts denovo só para nao ter que recalcular os top5 denovo
      // ou fazer uma 
      .then(a => {
        console.log(a)
        this.getPosts()
      })
      .catch(handleError)
      .finally(() => {
        this.emit(EVENTS.LOADING(EVENTS.NEW_POST), false)
      })
  }

  _deletePost = async id => {
    this.emit(EVENTS.LOADING(EVENTS.DELETE_POST), true)

    api
      .delete(`posts/${id}`)
      .then(() => {
        this.getPosts()
      })
      .catch(handleError)
      .finally(() => {
        this.emit(EVENTS.LOADING(EVENTS.DELETE_POST), false)
      })
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
    this.emit(EVENTS.LOADING(EVENTS.MORE_POSTS), true)

    return api
      .get(`posts?limit=${++this.limit}`)
      .then(rs => {
        console.log('Recebendo mais posts...', rs.data.posts)
        this.data.posts = [...this.data.posts, ...rs.data.posts]
        this.emit(EVENTS.MORE_POSTS, this.data)

        return rs
      })
      .catch(handleError)
      .finally(() => {
        this.emit(EVENTS.LOADING(EVENTS.MORE_POSTS), false)
      })
  }

  getPosts() {
    this.emit(EVENTS.LOADING(EVENTS.GET_POSTS), true)

    api
      .get(`posts`)
      .then(posts => {
        this.data = posts.data
        this.emit(EVENTS.GET_POSTS, this.data)
      })
      .catch(handleError)
      .finally(() => {
        this.emit(EVENTS.LOADING(EVENTS.GET_POSTS), false)
      })

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