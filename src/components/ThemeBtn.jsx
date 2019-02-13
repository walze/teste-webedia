import React from 'react'
import { toggleClass } from '../helpers';

export class ThemeBtn extends React.Component {

  btn = React.createRef()

  state = {
    active: false
  }

  _click = () => {
    const { current: btn } = this.btn
    const [text, ball] = btn.children

    const [active] = toggleClass([text, ball], 'active')

    this.setState({ active })
  }

  render() {
    return (
      <div className="theme-btn" onClick={this._click}>
        <div className='button' ref={this.btn}>
          <div className="text active">
            {this.state.active ? 'DARK' : 'LIGHT'}
          </div>
          <div className="ball active"></div>
        </div>
      </div>
    )
  }

}