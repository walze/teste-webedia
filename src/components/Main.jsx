import React from 'react'
import { Post } from './Post';

export class Main extends React.Component {


  render() {
    return (
      <div className="main">

        <div className="posts">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>


      </div>
    )
  }

}