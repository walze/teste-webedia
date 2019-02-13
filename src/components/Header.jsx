import React from 'react'
import { ThemeBtn } from './ThemeBtn'

export class Header extends React.Component {


  render() {
    return (
      <div className="header">

        <ThemeBtn />

        <div className="heading">
          <h3 className='news'>NEWS</h3>
          <div className="line"></div>
        </div>

      </div>
    )
  }

}