import { ADD_MEMBER } from './types';
import store from '../store'

export function addMemberAction(member) {
  store.dispatch({
    type: ADD_MEMBER,
    member
  })
}