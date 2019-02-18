import React from 'react'
import { toggleClass } from '../helpers'
import { themeChange } from '../actions/general'
import generalEmitter from '../stores/general'
import EVENTS from '../events'
import { postStore } from '../stores/PostStore';

export class Buttons extends React.Component {

  _btn = React.createRef()
  state = {
    dark: false
  }

  componentDidMount() {
    generalEmitter.on(EVENTS.THEME_CHANGE, () => this._click())
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
    const TEMP_ALL = Array.from(document.body.querySelectorAll('*:not(script)'))
    toggleClass(TEMP_ALL, 'dark', !removeDark)
  }


  newPost = () => {
    const url = prompt('Digite a URL')
    postStore.newPost(url)
  }

  render() {
    return (
      <div className="buttons">
        <div className="add" onClick={this.newPost}>Add News +</div>
        <div className="theme-btn" onClick={themeChange}>
          <div className='button' ref={this._btn}>
            <div className="text">
              {this.state.dark ? 'DARK' : 'LIGHT'}
            </div>
            <div className="ball"></div>
          </div>
        </div>
      </div>
    )
  }

}