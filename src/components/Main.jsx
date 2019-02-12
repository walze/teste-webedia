import React from 'react'

export class Main extends React.Component {

  render() {
    return (
      <div className="main">

        <div className="posts">
          {this.props.posts.map(post => post)}
        </div>


      </div>
    )
  }

}