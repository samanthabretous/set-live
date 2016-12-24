import React from 'react'
import Display from '../app/Display'
import store from '../store'
import {generateUserName, generateRoomName} from '../actions/thunk-actions'
import {socket} from '../actions/socket-listeners/connections'
import style from './landingStyles'
import {Link} from 'react-router'
import Radium from 'radium'
import {Motion, spring} from 'react-motion';

const LandingPage = Radium((props) => {
  let handleNameChange = (event) => {
    store.dispatch(generateUserName(event.target.value))
  };
  let handleRoomChange = (event) => {
    store.dispatch(generateRoomName(event.target.value))
  };

  let joinRoom = () =>{
    socket.emit('enterGameRoom', {
      roomName: props.roomName,
      username: props.username 
    });
  };

  return (
    <div style={style.landingPage}>
<Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
  {interpolatingStyle => <div style={interpolatingStyle} />}
</Motion>
      <input 
        onChange={handleNameChange}
        style={style.landingInput}
        placeholder="enter your full name..."
        defaultValue={props.username ? props.username : ""}
        required /> 
      <input 
        onChange={handleRoomChange}
        style={style.landingInput} 
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
    </div>
  )
})

export default LandingPage;