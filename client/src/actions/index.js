import { ADD_MEMBER, CONNECTIONS_STATUS, PLAYERS, CLICKED_CARDS, LOGIN_MODAL, SET_ROOM_NAME, SET_USER_NAME, SET_EMAIL, SET_PASSWORD, MODAL_STATUS, LOGIN_FORM_ERRORS } from './types';

export const formUsernameAction = username => ({
  type: SET_USER_NAME,
  username
})

export const formEmailAction = email => ({
  type: SET_EMAIL,
  email
})

export const formPasswordAction = password => ({
  type: SET_PASSWORD,
  password
})

export const loginModalAction = loginModal => ({
  type: LOGIN_MODAL,
  loginModal
})

export const loginErrorsAction = loginErrors => ({
  type: LOGIN_FORM_ERRORS,
  loginErrors
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