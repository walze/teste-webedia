import React, { Component } from 'react'
import { Header } from './components/Header'
import { Posts } from './components/Posts'
import { Sidebar } from './components/Sidebar'
import { postStore, EVENTS } from './stores/PostStore'


class App extends Component {

  state = {
    posts: postStore.all,
  }

  componentWillMount() {
    postStore.on(EVENTS.NEW_POSTS, this._updatePosts)
  }

  render() {
    console.log(this.state)

    return (
      <div className="App">

        <div className="main-wrapper">
          <div className='main'>
            <Header />
            <Posts posts={this.state.posts} />
          </div>

          <Sidebar posts={this.state.posts} />
        </div>

      </div>
    )
  }

  _updatePosts = posts => this.setState({ posts })

}

export default App
