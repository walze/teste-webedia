import React, { Component } from 'react'
import { Header } from './components/Header'
import {  Posts } from './components/Posts'
import { Post2 } from './components/Post2'
import { isMobile } from './helpers'
import { Post } from './components/Post'

class App extends Component {

  state = {
    isMobile: isMobile(),
    TEMP_POSTS: {
      posts: [
        <Post />,
        <Post />,
        <Post />,
        <Post />,
      ],
      top5: [
        <Post2 />,
        <Post2 />,
        <Post2 />,
        <Post2 />,
        <Post2 />,
      ]
    }
  }

  render() {
    return (
      <div className="App">

        <div className="main-wrapper">
          <div className='main'>
            <Header />
            <Posts posts={this.state.TEMP_POSTS.posts} />
          </div>

          <div className="sidebar">
            {this.state.TEMP_POSTS.top5.map(post => post)}
          </div>
        </div>

      </div>
    )
  }

}

export default App
