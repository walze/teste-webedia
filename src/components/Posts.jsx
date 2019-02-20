import React from 'react'
import { Post } from './Post'

import TinySlider from "tiny-slider-react"
import { postStore } from '../stores/PostStore'
import { mobileStore } from '../stores/MobileStore'
import { Loading } from './Loading'
import { debounce } from '../helpers'
import EVENTS from '../events';

const settings = {
  slideBy: "page",
  mouseDrag: true,
  controls: false,
  nav: true,
  loop: false
}

export class Posts extends React.Component {

  ts = React.createRef()
  morePostsLock = false

  state = {
    mobile: mobileStore.isMobile,
    loading: false
  }

  constructor(props) {
    super(props)

    this._infiniteScrollListen()
  }

  componentWillMount() {
    postStore.on(EVENTS.LOADING(EVENTS.MORE_POSTS), loading => {
      this.setState({ loading })
    })

    mobileStore.onResize(this._onResize)
  }

  componentWillUnmount() {
    mobileStore.onResize(this._onResize)
  }

  _onResize = mobile => this.setState({ mobile })

  _checkSliderMorePosts = () => {
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


  _infiniteScrollListen() {
    const offset = 900
    const scroll = this._onScroll(offset)

    let scrollIsOn = true

    const onScrollDebounce = debounce(scroll, 100)

    window.addEventListener('scroll', onScrollDebounce)

    mobileStore.onResize(mobile => {

      if (mobile && !scrollIsOn) {
        window.addEventListener('scroll', onScrollDebounce)

      } else if (!mobile && scrollIsOn) {
        window.removeEventListener('scroll', onScrollDebounce)

      }

    })
  }

  _onScroll = (offset) => () => {
    const scroll = window.scrollY + window.outerHeight + offset
    const height = document.body.scrollHeight

    if (scroll >= height && !this.morePostsLock) {
      console.log('More posts...')
      this.morePostsLock = true

      postStore.getMorePosts()
    }
  }


  render() {
    const postsArr = this.props
      .posts.map(data =>
        <Post mobile={this.state.mobile} key={data.id} data={data} />
      )

    const posts = this.state.mobile
      ? this._renderMobile(postsArr)
      : postsArr

    return (
      <div>
        <div className={`posts ${this.state.mobile ? 'mobile' : ''}`}>
          {posts}
        </div>

        <Loading hidden={!this.state.loading} />
      </div>
    )
  }

  _renderMobile(posts) {
    return (
      <TinySlider onTransitionStart={this._checkSliderMorePosts} settings={settings} ref={this.ts}>
        {posts}
      </TinySlider>
    )
  }

}