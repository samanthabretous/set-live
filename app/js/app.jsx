import React from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import {cards} from "./card_deck.js";

var socket = io("http://localhost:3000");

// require("../css/style.css");

let App = React.createClass({
  render() {
    return (
      <div>
        <h1>Set Game</h1>
        <ChatBar />
      </div>
    )
  }
})

let ChatBar = React.createClass({
  getInitialState(){
    return {
      messages: [], 
      socket: socket}
  },
  componentDidMount(){
    this.state.socket.emit('test')
  },
  render(){
    return(
      <div>Chat application</div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

