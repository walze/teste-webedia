import React, { Component } from 'react'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Post2 } from './components/Post2'
import { isMobile } from './helpers';
import { Post } from './components/Post';

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

  constructor(props) {
    super(props)

    window.addEventListener('resize', () => this.setState({ isMobile: isMobile() }))
  }

  render() {
    return (
      <div className="App container">

        <Header />

        <div className="main-wrapper">
          <Main posts={this.state.TEMP_POSTS.posts} />

          <div className="sidebar" hidden={this.state.isMobile}>
            {this.state.TEMP_POSTS.posts.map(post => post)}
          </div>
        </div>

      </div>
    )
  }

}

export default App
