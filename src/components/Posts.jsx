import React from 'react'
import { Post } from './Post';
import { isMobile } from '../helpers'

import { tns } from "tiny-slider/src/tiny-slider"

export class Posts extends React.Component {

  componentDidMount() {
    if (isMobile())
      this.slider = tns({
        container: ".posts",
        items: 1,
        slideBy: "page",
        mouseDrag: true,
        controls: false,
        nav: true,
        navPosition: 'bottom'
      });

  }

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