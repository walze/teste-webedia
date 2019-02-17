import React from 'react'
import { Post } from './Post'

export class Sidebar extends React.Component {

  render() {
    return (
      <div className="sidebar">
        {this.props.posts.map(data =>
          <Post
            simple={true}
            key={data.id}
            data={data}
          />
        )}
      </div>
    )
  }

}