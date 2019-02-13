import React from 'react'
import { Post } from './Post';
import { isMobile } from '../helpers'

import { tns } from "tiny-slider/src/tiny-slider"

export class Posts extends React.Component {


  componentDidMount() {
    this.slider = tns({
      container: ".posts",
      items: 1,
      slideBy: "page",
      mouseDrag: true,
      controls: false,
      nav: true,
      navPosition: 'bottom',
      disable: true
    });

    if (!isMobile()) this.slider.destroy()

    window.addEventListener('resize', () => {
      if (isMobile()) return this.slider.rebuild()
      if (!isMobile()) return this.slider.destroy()

      alert('consertar isso')
    })
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