import React from 'react'
import Display from './parts/display'
import Join from './landingPage/Join'
import EnterRoom from './landingPage/EnterRoom'

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