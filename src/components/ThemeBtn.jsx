import React from 'react'
import { toggleClass } from '../helpers';

export class ThemeBtn extends React.Component {

  _btn = React.createRef()
  state = {
    dark: false
  }

  componentDidMount() {
    const darkTheme = window.localStorage.getItem('DARK_THEME') === 'true'

    if (darkTheme) this._click()
  }

  _click = () => {
    const { current: btn } = this._btn
    const [text, ball] = btn.children
    const [dark] = toggleClass([text, ball], 'active')

    this.setState({ dark })
    this._changeTheme(dark)
    window.localStorage.setItem('DARK_THEME', dark)
  }

  _changeTheme(removeDark) {
    // TEMPORARIO?
    // POSSIVEL FIX: ADICIONAR CLASSE .DARKABLE EM ELEMENTOS?
    // POSSIVEL FIX: EMITIR EVENTO PARA APP.JSX, SELECIONAR ELEMENTOS COM .DARKABLE LA?
    const TEMP_ALL = Array.from(document.body.querySelectorAll('*'))
    toggleClass(TEMP_ALL, 'dark', !removeDark)
  }

  render() {
    return (
      <div className="theme-btn" onClick={this._click}>
        <div className='button' ref={this._btn}>
          <div className="text">
            {this.state.dark ? 'DARK' : 'LIGHT'}
          </div>
          <div className="ball"></div>
        </div>
      </div>
    )
  }

}