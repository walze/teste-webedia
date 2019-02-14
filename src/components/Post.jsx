
import React from 'react'
import { mobileStore } from '../stores/MobileStore'
import { PostImage } from './PostImage';

export class Post extends React.Component {

  state = {
    mobile: mobileStore.isMobile
  }

  componentDidMount() {
    mobileStore.onResize(mobile => {
      this.setState({ mobile })
    })
  }

  render() {
    const simple = !!this.props.simple
    const simpleClass = simple ? 'simple' : ''
    const imageAfter = this.state.mobile && simple

    return (
      <div className={`post ${simpleClass}`}>
        <PostImage likes={this.props.likes} simple={simple} hidden={imageAfter} />

        <div className="body">
          <h4 className="header" hidden={imageAfter}>{this.props.header}</h4>

          <p className="description">{this.props.description}</p>

          <div className="footer">
            <div hidden={imageAfter || simple}>
              <i className="fi fi-earth icon-margin"></i>
              <span>{this.props.name}</span>
            </div>
            <div hidden={simple && !imageAfter}>
              <i className="fi fi-clock icon-margin"></i>
              <span>{this.props.date}</span>
            </div>
          </div>
        </div>

        <PostImage likes={this.props.likes} simple={simple} hidden={!imageAfter} />
      </div>
    )
  }


}
