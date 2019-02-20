import dispatcher from '../Dispatcher'
import EVENTS from '../events'

export const likePost = payload =>
  dispatcher.dispatch({ type: EVENTS.LIKE, payload })

export const newPost = payload =>
  dispatcher.dispatch({ type: EVENTS.NEW_POST, payload })

export const deletePost = payload =>
  dispatcher.dispatch({ type: EVENTS.DELETE_POST, payload })
