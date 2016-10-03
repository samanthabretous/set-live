import React from 'react';
import ReactDOM from "react-dom";
import io from 'socket.io-client';


//import "../css/style.css";


const App = React.createClass({

  render() {
    return (
      <div>
        <h1>Set Game</h1>
        {this.props.children}
      </div>
    )
  }
})

export default App


