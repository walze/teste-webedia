import dispatcher from './../Dispatcher'
import EVENTS from '../events'

export const likePost = payload =>
  dispatcher.dispatch({ type: EVENTS.LIKE, payload })