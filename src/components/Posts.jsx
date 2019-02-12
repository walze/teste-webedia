import React from 'react'

export class Posts extends React.Component {

  render() {
    return (
      <div>

        <div className="posts">
          {this.props.posts.map(post => post)}
        </div>


      </div>
    )
  }

}