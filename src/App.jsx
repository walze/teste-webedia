import React, { Component } from 'react'
import { Header } from './components/Header'
import { Posts } from './components/Posts'
import { Sidebar } from './components/Sidebar'

const obj = {
  likes: 123,
  header: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  name: 'Some Long Name',
  date: '1h ago'
}

class App extends Component {

  state = {
    TEMP_POSTS: {
      posts: [...Array(4).fill(obj)],
      top5: [...Array(5).fill(obj)],
    }
  }

  render() {
    console.log(this.state)

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
