
import React from 'react'

export class Post extends React.Component {


  render() {
    return !this.props.simple
      ? this._render()
      : this._renderSimple()
  }


  _render() {
    return (
      <div className="post">

        <div className="img">
          <img src="https://via.placeholder.com/320" alt="" />

          <div className="likes">
            <div className="icon"><i class="fi fi-heart"></i></div>
            <div className="count">123</div>
          </div>
        </div>

        <div className="body">
          <h4 className="header">Lorem, ipsum dolor.</h4>

          <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, eligendi.</p>

          <div className="footer">
            <div>
              <i class="fi fi-earth icon-margin"></i>
              <span>Long name here</span>
            </div>
            <div>
              <i class="fi fi-clock icon-margin"></i>
              <span>1h ago</span>
            </div>
          </div>
        </div>

      </div >
    )
  }

  _renderSimple() {
    return (
      <div className="post alternative">

        <div className="img">
          <img src="https://via.placeholder.com/320" alt="" />
        </div>

        <div className="body">
          <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, eligendi.</p>
        </div>

      </div>
    )
  }

}
