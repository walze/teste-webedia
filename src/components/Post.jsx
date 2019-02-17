
import React from 'react'
import { PostImage } from './PostImage';

export class Post extends React.Component {


  click = e => {
    console.log('post', e)
  }

  render() {
    const simple = !!this.props.simple
    const simpleClass = simple ? 'simple' : ''
    const imageAfter = this.props.mobile && simple

    return (
      <div className={`post ${simpleClass}`} onClick={this.click}>
        <PostImage likes={this.props.count} simple={simple} />

        <div className="body">
          <h4 className="header" hidden={imageAfter}>{this.props.title}</h4>

          <p className="description">{this.props.body}</p>

          <div className="footer">
            <div hidden={imageAfter || simple}>
              <i className="fi fi-earth icon-margin"></i>
              <span>{this.props.author}</span>
            </div>
            <div hidden={simple && !imageAfter}>
              <i className="fi fi-clock icon-margin"></i>
              <span>{this.props.date}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }


}
