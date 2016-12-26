import { ADD_MEMBER, CONNECTIONS_STATUS, PLAYERS, CLICKED_CARDS, SET_ROOM_NAME, MODAL_STATUS, } from './types';


export const loginLoadingAction = loading => ({
  type: LOGIN_LOADING,
  loading
})

export const addMemberAction = member => ({
  type: ADD_MEMBER,
  member
})

export const changeStatusAction = status => ({
  type: CONNECTIONS_STATUS,
  status
})

export const playerAction = player => ({
  type: PLAYERS,
  player
})

export const joinedAction = member => ({
  type: JOIN_MEMBER
})

export const addClickedCard = payload => ({
  type: CLICKED_CARDS,
  payload 
})

export const inviteModalAction = modalStatus => ({
  type: MODAL_STATUS, 
  modalStatus
})

export const generateRoomName = roomName => ({
  type: SET_ROOM_NAME,
  roomName
})