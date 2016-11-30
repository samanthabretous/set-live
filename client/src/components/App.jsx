import React from 'react';
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import store from '../store'

//import "../css/style.css";

const App = (props) => {
  return (
    <div>
      <h1>Set Game</h1>
      {props.status =='connected' ? <h1>Connected</h1> : null}
      {props.children}
    </div>
  )
}

export default App


