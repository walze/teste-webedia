
import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'

library.add(faIgloo)

ReactDOM.render(<App />, document.querySelector('#root'))

