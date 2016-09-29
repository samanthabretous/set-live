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
    var self = this;
    this.state.socket.on('received message', function(msg) {
      console.log(msg)
      self.setState({messages: self.state.messages.concat(msg)})
    })
  },
  submitMessage(){
    var message = document.getElementById('message').value;
    this.state.socket.emit('new message', message)
  },
  render(){
    var self = this;
    var messages = this.state.messages.map(function(msg,i){
      return <li key={i}>{msg}</li>
    })
    return(
      <div>
        <ul>
          {messages}
        </ul>
        <input id="message" type="text"/>
        <button onClick={self.submitMessage}>Send message</button>
        <input id="username" type="text" placeholder="choose username" />
        <button onClick={self.submitMessage}>Enter Username</button>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

