import React from 'react';
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import store from '../store'

//import "../css/style.css";

const App = React.createClass({
  render() {
    var that = this
    var children = React.Children.map(this.props.children, function(child) {
        return React.cloneElement(child, Object.assign({}, that.state));
    });
    return (
      <div>
        <h1>Set Game</h1>
        {this.props.status =='connected' ? <h1>Connected</h1> : null}
        {children}
      </div>
    )
  }
})

export default App


