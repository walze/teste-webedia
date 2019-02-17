import dispatcher from './../Dispatcher'
import { EVENTS } from './../stores/PostStore';

export const likePost = payload =>
  dispatcher.dispatch({ type: EVENTS.LIKE, payload })