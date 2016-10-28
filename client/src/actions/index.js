import { ADD_MEMBER, CHANGE_STATUS, PLAYERS } from './types';
import store from '../store'

export function addMemberAction(member) {
  store.dispatch({
    type: ADD_MEMBER,
    member
  })
}

export function changeStatusAction(status) {
  store.dispatch({
    type: CHANGE_STATUS,
    status
  })
}

export function playerAction(player) {
  store.dispatch({
    type: PLAYERS,
    player
  })
}

export function joinedAction(member){
  store.dispatch({
    type: JOIN_MEMBER
  })
}