import dispatcher from "../dispatcher"
import EVENTS from '../events'

export const themeChange = () => dispatcher.dispatch({ type: EVENTS.THEME_CHANGE })