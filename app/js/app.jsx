import React from "react";
import ReactDOM from "react-dom";
import {cards} from "./card_deck.js";

// require("../css/style.css");

console.log(cards)

var App = React.createClass({
  render() {
    return (
      <h1>Set Game</h1>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

