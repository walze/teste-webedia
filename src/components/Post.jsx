
import React from 'react'

export class Post extends React.Component {


  render() {
    return (
      <div className="post">

        <div className="img">
          <img src="https://via.placeholder.com/320" alt="" />

          <div className="likes">
            <div className="icon">❤</div>
            <div className="count">123</div>
          </div>
        </div>

        <div className="body">
          <h4 className="header">Lorem, ipsum dolor.</h4>

          <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, eligendi.</p>

          <div className="footer">
            <span>Long name here</span>
            <span>1h ago  </span>
          </div>
        </div>

      </div>
    )
  }

}
