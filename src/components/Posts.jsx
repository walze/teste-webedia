import React from 'react'
import { Post } from './Post';
import { isMobile } from '../helpers'

import { tns } from "tiny-slider/src/tiny-slider"

export class Posts extends React.Component {

  mobile = isMobile()
  slider = null
  sliderOn = isMobile()

  componentDidMount() {
    this._handleSliderInstantiation()

    window.addEventListener('resize', () => {
      this._handleSliderInstantiation()

      const mobile = isMobile()
      let { sliderOn } = this

      if (mobile && !sliderOn && this.slider) {
        sliderOn = true
        this.slider = this.slider.rebuild()
      }

      if (!mobile && sliderOn && this.slider.destroy) {
        sliderOn = false
        this.slider.destroy()
      }

      this.mobile = mobile
      this.sliderOn = sliderOn
    })
  }


  _handleSliderInstantiation() {
    if (this.slider || !this.mobile) return

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