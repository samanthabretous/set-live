import { CONNECTIONS_STATUS,   SET_ROOM_NAME } from './types';



export const changeStatusAction = status => ({
  type: CONNECTIONS_STATUS,
  status
})

export const generateRoomName = roomName => ({
  type: SET_ROOM_NAME,
  roomName
})