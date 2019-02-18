import React from 'react'
import { Buttons } from './Buttons'

export class Header extends React.Component {


  render() {
    return (
      <div className='header'>

        <Buttons />

        <div className='heading'>
          <h3 className='news'>NEWS</h3>
          <div className='line'></div>
        </div>

      </div>
    )
  }

}