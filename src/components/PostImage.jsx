
import React from 'react'
import { postStore } from '../stores/PostStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class PostImage extends React.Component {


  _like = e => {
    e.preventDefault()
    e.stopPropagation()

    this.props.onLike()
  }

  _delete = e => {
    e.preventDefault()
    e.stopPropagation()

    this.props.onDelete()
  }

  render() {
    const alreadyLiked = postStore.checkIfLiked(this.props.post.id)
    const likeClass = alreadyLiked ? 'liked' : ''
    const style = {
      backgroundImage: `url('${this.props.post.image || 'https://via.placeholder.com/320'}')`
    }

    return (
      <div
        className='img'
        hidden={this.props.hidden}
        style={style}
      >

        <div className='likes delete' hidden={this.props.simple} onClick={this._delete}>
          <div className='icon'>
            <FontAwesomeIcon icon="trash-alt" />
          </div>
        </div>

        <div className={`likes ${likeClass} like`} hidden={this.props.simple} onClick={this._like}>
          <div className='icon'>
            <FontAwesomeIcon icon="heart" />
          </div>
          <div className='count'>
            <b>
              {this.props.post.count}
            </b>
          </div>
        </div>
      </div >
    )
  }


}
