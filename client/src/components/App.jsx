import React from 'react';
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import store from '../store'
import SetLogo from '../../images/set_logo.svg';


const App = (props) => {
  return (
    <div>
      <SetLogo />  
      {props.status =='connected' ? <h1>Connected</h1> : null}
      {props.children}
    </div>
  )
}

export default App


