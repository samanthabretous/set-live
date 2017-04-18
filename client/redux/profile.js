/** ===========================
  TYPES
==============================*/
const SET_ROOM_NAME = 'set_room_name';

/** ===========================
  ACTIONS
==============================*/
export const generateRoomName = roomName => ({
  type: SET_ROOM_NAME,
  roomName,
});

/** ===========================
  REDUCER
==============================*/
