
import React from 'react'
import { PostImage } from './PostImage'
import { likePost, deletePost } from './../actions/postActions'
import { timeAgo } from '../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Post extends React.Component {

  click = () => {
    window.open(this.props.data.link)
  }

  _like = () => likePost(this.props.data)
  _delete = () => deletePost(this.props.data)

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
          onDelete={this._delete}
          post={this.props.data}
          simple={simple}
        />

        <div className="body">
          <h4 className="header" hidden={mobile}>
            {this.props.data.title}
          </h4>

          <p className="description">
            {this.props.data.description}
          </p>

          <div className="footer">

            <div hidden={mobile || simple}>
              <FontAwesomeIcon icon='globe' />
              <span>{this.props.data.site_name}</span>
            </div>

            <div hidden={simple && !mobile}>
              <FontAwesomeIcon icon='clock' />
              <span>{timeAgo(new Date(this.props.data.date))}</span>
            </div>

          </div>
        </div>
      </div>
    )
  }


}
