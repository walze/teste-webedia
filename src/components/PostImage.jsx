
import React from 'react'
import { postStore } from '../stores/PostStore'

export class PostImage extends React.Component {


  _like = e => {
    e.preventDefault()
    e.stopPropagation()

    this.props.onLike()
  }

  render() {
    const alreadyLiked = postStore.checkIfLiked(this.props.post.id)
    const likeClass = alreadyLiked ? 'liked' : ''

    return (
      <div className="img" hidden={this.props.hidden}>
        <img src={this.props.post.image || "https://via.placeholder.com/320"} alt="" />

        <div className={`likes ${likeClass}`} hidden={this.props.simple} onClick={this._like}>
          <div className="icon"><i className="fi fi-heart"></i></div>
          <div className="count">
            <b>
              {this.props.post.count}
            </b>
          </div>
        </div>
      </div>
    )
  }


}
