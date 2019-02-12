import React from 'react'

export class Header extends React.Component {


  render() {
    return (
      <div className="header">

        <div className="theme-btn">
          <button>theme</button>
        </div>

        <div className="heading">
          <h3 className='news'>NEWS</h3>
          <div className="line"></div>
        </div>

      </div>
    )
  }

}