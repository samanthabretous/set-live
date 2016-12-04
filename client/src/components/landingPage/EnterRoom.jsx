import React from 'react'
import {Link} from 'react-router'

import {socket} from '../../actions/socket-listeners/connections'
import store from '../../store'
import {generateRoomName} from '../../actions/thunk-actions'

const EnterRoom = (props) => {
  let handleChange = (event) => {
    store.dispatch(generateRoomName(event.target.value))
  };

  let joinRoom = () =>{
    socket.emit('enterGameRoom', {
      roomName: props.roomName,
      username: props.username 
    });
  };

  return (
    <form action="javascript:void(0)" >
      <label> Room Name </label>
      <input 
        onChange={handleChange}
        className="roomName" 
        placeholder="enter a room name..."
        required />
      <Link to={"/game/" + props.roomName}>
        <button to="/game" 
          className="btn btn-primary"
          disabled={!props.roomName}
          onClick={joinRoom}>
          Enter Room
        </button>
      </Link>
    </form>
  )
}

export default EnterRoom