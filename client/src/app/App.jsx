import React from 'react';

import store from '../store'
import SetLogo from '../../images/set_logo.inline.svg';

//components
import GameMenu from '../game/GameMenu'
import Display from './Display'


const App = (props) => {
  let styles = {

  }
  return (
    <div className={"app " + (props.params.room ? "game" : "")}>
      <div className={props.params.room ? "gameMenu" : ""}>
        <div className={props.params.room ? "logoTransition" : "set_logo"}>
          <SetLogo /> 
        </div> 
        {props.params.room && <GameMenu {...props}/>}
      </div>
      {props.children}
    </div>
  )
}

export default App


