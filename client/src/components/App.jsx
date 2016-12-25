import React from 'react';

import store from '../store'
import SetLogo from '../../images/set_logo.inline.svg';

//components
import GameMenu from './GameMenu'
import Display from './Display'
import LoginModal from './LoginModal'


const App = (props) => {
  const {params, children, 
  loginModalAction, loginModal} = props

  //show login/resigter modal
  const setLoginModal = () => {
    loginModalAction(!loginModal)
  }

  return (
    <div className={"app " + (params.room ? "game" : "")}>
      <div className={params.room ? "gameMenu" : ""}>
        <div className={params.room ? "logoTransition" : "set_logo"}>
          <SetLogo /> 
        </div> 
        <button onClick={setLoginModal}>Login</button>
        {loginModal && <LoginModal {...props}/>}
        {params.room && <GameMenu {...props}/>}
      </div>
      {children}
    </div>
  )
}

export default App


