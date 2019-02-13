import React from 'react'
import { Post } from './Post'

export class Sidebar extends React.Component {

  render() {
    return (
      <div className="sidebar">
        {this.props.posts.map((data, i) =>
          <Post key={i} simple={true} {...data} />
        )}
      </div>
    )
  }

}