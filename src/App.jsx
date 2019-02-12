import React, { Component } from 'react'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Post2 } from './components/Post2'
import { isMobile } from './helpers';

class App extends Component {

  state = {
    isMobile: isMobile()
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
          <Main />

          <div className="sidebar" hidden={this.state.isMobile}>
            <Post2 />
            <Post2 />
            <Post2 />
            <Post2 />
            <Post2 />
          </div>
        </div>

      </div>
    )
  }

}

export default App
