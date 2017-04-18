/** ===========================
  TYPES
==============================*/
export const ADD_MEMBER = 'add_member';
export const CONNECTION_STATUS = 'change_status';
export const ROOM_STATUS = 'room_status';
export const SET_PLAYER_INFO = 'set_player_info';

/** ===========================
ACTIONS
==============================*/
export const connectionStatus = status => ({
  type: CONNECTION_STATUS,
  status,
});

export const addMember = member => ({
  type: ADD_MEMBER,
  member,
});

export const roomStatus = status => ({
  type: ROOM_STATUS,
  roomStatus: status,
});

export const setPlayerInfo = playerInfo => ({
  type: SET_PLAYER_INFO,
  playerInfo,
});
