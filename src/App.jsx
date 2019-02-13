import React, { Component } from 'react'
import { Header } from './components/Header'
import { Posts } from './components/Posts'
import { Sidebar } from './components/Sidebar'

class App extends Component {

  state = {
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

          <Sidebar posts={this.state.TEMP_POSTS.top5} />
        </div>

      </div>
    )
  }

}

export default App
