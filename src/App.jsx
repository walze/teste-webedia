import React, { Component } from 'react'
import { Header } from './components/Header'
import { Posts } from './components/Posts'
import { Sidebar } from './components/Sidebar'
import { postStore } from './stores/PostStore'
import EVENTS from './events'
import { themeChange } from './actions/general'
import { Loading } from './components/Loading'


class App extends Component {

  state = {
    loading: true,
    posts: postStore.getPosts(),
    top5: []
  }

  componentWillMount() {
    postStore.on(EVENTS.GET_POSTS, this._updatePosts)
    postStore.on(EVENTS.MORE_POSTS, this._updatePosts)
    postStore.on(EVENTS.LOADING(EVENTS.NEW_POST), loading => this.setState({ loading }))
  }

  componentWillUnmount() {
    postStore.off(EVENTS.GET_POSTS, this._updatePosts)
    postStore.off(EVENTS.MORE_POSTS, this._updatePosts)
  }

  componentDidMount() {
    const darkTheme = window.localStorage.getItem('DARK_THEME') === 'true'
    if (darkTheme) themeChange()
  }

  render() {
    return (
      <div className="App">
        <div className="main-wrapper">
          <div className='main'>
            <Header />
            <Loading hidden={!this.state.loading} />
            <Posts posts={this.state.posts} />
          </div>

          <Sidebar posts={this.state.top5} />
        </div>

      </div>
    )
  }

  _updatePosts = ({ posts, top5 }) => {

    this.setState({
      posts,
      top5,
      loading: false
    })
  }

}

export default App
