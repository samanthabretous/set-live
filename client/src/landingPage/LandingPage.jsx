import React from 'react'
import Display from '../app/Display'
import Join from './Join'
import EnterRoom from './EnterRoom'

const LandingPage = (props) => {
  return (
    <div className="landingPage">
      <Join username={props.username}/>
      <EnterRoom 
        roomName={props.roomName} 
        username={props.username}
      />
    </div>
  )
}

export default LandingPage;