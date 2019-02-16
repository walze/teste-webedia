import React from 'react'
import { Post } from './Post';

import TinySlider from "tiny-slider-react";
import { postStore } from '../stores/PostStore';

const settings = {
  items: 1,
  slideBy: "page",
  mouseDrag: true,
  controls: false,
  nav: true,
};



export class Posts extends React.Component {

  ts = React.createRef()

  componentDidMount() {
    console.log(this.ts.current)
  }

  _sliderListen() {
    const obj = this.ts.current.slider.getInfo()
    const { navCurrentIndex, slideCount } = obj

    if (navCurrentIndex >= slideCount - 1) {
      postStore
        .getMorePosts()
        .then(() => {
          this.ts.current.slider.goTo(navCurrentIndex)
        })
    }
  }

  render() {

    return (
      <div>
        <TinySlider onTransitionStart={() => this._sliderListen()} settings={settings} ref={this.ts}>
          {this.props.posts.map((data, i) =>
            <Post key={i} {...data} />
          )}
        </TinySlider>

        <div className="posts" ref={this.posts}>
          {this.props.posts.map((data, i) =>
            <Post key={i} {...data} />
          )}
        </div>
      </div>
    )
  }

}