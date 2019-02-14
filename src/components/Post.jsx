
import React from 'react'

export class Post extends React.Component {

  render() {
    const simple = !!this.props.simple
    const simpleClass = simple ? 'simple' : ''

    return (
      <div className={`post ${simpleClass}`}>
        <div className="img">
          <img src="https://via.placeholder.com/320" alt="" />

          <div className="likes" hidden={simple}>
            <div className="icon"><i className="fi fi-heart"></i></div>
            <div className="count">123</div>
          </div>
        </div>

        <div className="body">
          <h4 className="header">Lorem, ipsum dolor.</h4>

          <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, eligendi.</p>

          <div className="footer" hidden={simple}>
            <div>
              <i className="fi fi-earth icon-margin"></i>
              <span>Long name here</span>
            </div>
            <div>
              <i className="fi fi-clock icon-margin"></i>
              <span>1h ago</span>
            </div>
          </div>
        </div>

      </div>
    )
  }


}
