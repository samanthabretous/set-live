import React from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client" 
// import {cards} from "./card_deck.js";

// require("../css/style.css");

// console.log(cards)

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
      socket: window.io('http://localhost:3000')}
  },
  componentDidMount(){
    
  },
  render(){
    return(
      <div>Chat application</div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

