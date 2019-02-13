import React from 'react'
import { toggleClass } from '../helpers';

export class ThemeBtn extends React.Component {

  _btn = React.createRef()
  state = {
    active: false
  }

  _click = () => {
    const { current: btn } = this._btn
    const [text, ball] = btn.children

    const [active] = toggleClass([text, ball], 'active')
    this.setState({ active })

    // TEMPORARIO?
    // POSSIBLE FIX: ADICIONAR CLASSE .DARKABLE EM ELEMENTOS?
    // POSSIBLE FIX: EMITIR EVENTO PARA APP.JSX, SELECIONAR ELEMENTOS COM .DARKABLE LA?
    const TEMP_ALL = Array.from(document.body.querySelectorAll('*'))
    toggleClass(TEMP_ALL, 'dark')
  }

  render() {
    return (
      <div className="theme-btn" onClick={this._click}>
        <div className='button' ref={this._btn}>
          <div className="text">
            {this.state.active ? 'DARK' : 'LIGHT'}
          </div>
          <div className="ball"></div>
        </div>
      </div>
    )
  }

}