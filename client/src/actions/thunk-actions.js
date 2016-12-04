import $ from 'jquery'
import {socket} from './socket-listeners/connections'
import {SET_USER_NAME, SET_ROOM_NAME} from './types'

export const generateRoomName = roomName => ({
  type: SET_ROOM_NAME,
  roomName
})

export const generateUserName = username => ({
  type: SET_USER_NAME,
  username
})

export const generateUserNameAsync = () => dispatch => {
  //capitalize name received from ajax call
  let capName = (arr) => arr.map(name => 
      name.substr(0,1).toUpperCase() + name.substr(1).toLowerCase()
    ).join(" ")

  return $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    type: 'get'
  })
  .done(data => {
    let name = data.results[0].name
    dispatch(generateUserName(capName([name.first, name.last])));
  })
}


