import React from "react";
import ReactDOM from "react-dom";
import {cards} from "./card_deck.js";
import {shuffleCards} from './shuffled_deck.js';

// require("../css/style.css");

console.log(cards)

const App = React.createClass({
  getInitialState() {
    deck: 
  },

  render() {
    return (
      <h1>Set Game</h1>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

