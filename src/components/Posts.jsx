import React from 'react'
import { Post } from './Post'

import TinySlider from "tiny-slider-react"
import { postStore } from '../stores/PostStore'
import { mobileStore } from '../stores/MobileStore'

const settings = {
  items: 1,
  slideBy: "page",
  mouseDrag: true,
  controls: false,
  nav: true,
}

export class Posts extends React.Component {

  ts = React.createRef()

  state = {
    mobile: mobileStore.isMobile
  }

  _onResize = mobile => this.setState({ mobile })

  componentWillMount() {
    mobileStore.onResize(this._onResize)
  }

  componentWillUnmount() {
    mobileStore.onResize(this._onResize)
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
    console.log(this.props.posts)
    return (
      <div>
        <div className="posts mobile">
          <TinySlider onTransitionStart={() => this._sliderListen()} settings={settings} ref={this.ts}>
            {this.props.posts.map(data =>
              <Post
                mobile={this.state.mobile}
                key={data.id}
                data={data}
              />
            )}
          </TinySlider>
        </div>

        <div className="posts" ref={this.posts}>
          {this.props.posts.map(data =>
            <Post
              mobile={this.state.mobile}
              key={data.id}
              data={data}
            />
          )}
        </div>
      </div>
    )
  }

}