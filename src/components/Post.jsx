
import React from 'react'
import { PostImage } from './PostImage'
import { likePost } from './../actions/postActions'
import { timeAgo } from '../helpers'

export class Post extends React.Component {


  click = e => {
    console.log('post', e)
  }

  _like = () => {
    likePost(this.props.data)
  }

  render() {
    const simple = !!this.props.simple
    const simpleClass = simple ? 'simple' : ''
    const mobile = this.props.mobile && simple

    return (
      <div
        className={`post ${simpleClass}`}
        onClick={this.click}
        post-id={this.props.data.id}
      >
        <PostImage
          onLike={this._like}
          post={this.props.data}
          simple={simple}
        />

        <div className="body">
          <h4 className="header" hidden={mobile}>
            {this.props.data.title}
          </h4>

          <p className="description">
            {this.props.data.body}
          </p>

          <div className="footer">

            <div hidden={mobile || simple}>
              <i className="fi fi-earth icon-margin"></i>
              <span>{this.props.data.author}</span>
            </div>

            <div hidden={simple && !mobile}>
              <i className="fi fi-clock icon-margin"></i>
              <span>{timeAgo(new Date(this.props.data.date))}</span>
            </div>

          </div>
        </div>
      </div>
    )
  }


}
