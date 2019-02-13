import React from 'react'
import { Post } from './Post';

export class Posts extends React.Component {

  render() {
    return (
      <div className="posts">
        {this.props.posts.map((data, i) =>
          <Post key={i} {...data} />
        )}
      </div>
    )
  }

}