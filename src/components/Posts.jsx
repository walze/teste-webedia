import React from 'react'
import { Post } from './Post';

import { tns } from "tiny-slider/src/tiny-slider"
import { mobileStore } from '../stores/MobileStore';

export class Posts extends React.Component {

  slider = null
  sliderOn = mobileStore.isMobile

  componentDidMount() {
    this._handleSliderInstantiation(mobileStore.isMobile)

    mobileStore.onResize(mobile => {

      this._handleSliderInstantiation(mobile)

      let { sliderOn } = this

      if (mobile && !sliderOn && this.slider) {
        sliderOn = true
        this.slider = this.slider.rebuild()
      }

      if (!mobile && sliderOn && this.slider.destroy) {
        sliderOn = false
        this.slider.destroy()
      }

      this.sliderOn = sliderOn
    })
  }


  _handleSliderInstantiation(mobile) {
    if (this.slider || !mobile) return

    this.sliderOn = true
    this.slider = tns({
      container: ".posts",
      items: 1,
      slideBy: "page",
      mouseDrag: true,
      controls: false,
      nav: true,
      navPosition: 'bottom'
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