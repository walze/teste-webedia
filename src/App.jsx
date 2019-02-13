import React, { Component } from 'react'
import { Header } from './components/Header'
import { Posts } from './components/Posts'
import { isMobile } from './helpers'
import { Post } from './components/Post'

class App extends Component {

  state = {
    isMobile: isMobile(),
    TEMP_POSTS: {
      posts: [...Array(4)],
      top5: [...Array(5)],

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
            {this.state.TEMP_POSTS.top5.map((data, i) =>
              <Post key={i} simple={true} {...data} />
            )}
          </div>
        </div>

      </div>
    )
  }

}

export default App
