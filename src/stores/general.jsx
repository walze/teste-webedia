import dispatcher from "../Dispatcher"
import EVENTS from "../events"
import { EventEmitter } from "events"

const generalEmitter = new EventEmitter()

export function general({ type, payload } = {}) {

  switch (type) {
    case EVENTS.THEME_CHANGE:
      generalEmitter.emit(type)
      break

    default:
      break
  }
}

export default generalEmitter

dispatcher.register(general)