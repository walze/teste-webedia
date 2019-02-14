
import React from 'react'

export class PostImage extends React.Component {

  render() {
    return (
      <div className="img" hidden={this.props.hidden}>
        <img src="https://via.placeholder.com/320" alt="" />

        <div className="likes" hidden={this.props.simple}>
          <div className="icon"><i className="fi fi-heart"></i></div>
          <div className="count">{this.props.likes}</div>
        </div>
      </div>
    )
  }


}
