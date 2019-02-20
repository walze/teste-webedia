
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faTrashAlt, faGlobe, faClock, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'

library.add(faHeart, faTrashAlt, faGlobe, faClock, faSyncAlt)
ReactDOM.render(<App />, document.querySelector('#root'))

