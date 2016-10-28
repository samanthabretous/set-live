import React from 'react';
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import cards from '../card_deck' 
import store from '../store'

//import "../css/style.css";

const App = React.createClass({

  fillBoard(board) {
    let newBoard = board.map(slot => {
      if (null === slot) {
        var firstCard = this.state.shuffledCards[0]
        this.setState({shuffledCards: this.state.shuffledCards.splice(0,1)})
        return firstCard
      } else {
        return slot
      }
    })
    this.setState({board: newBoard})
  },
  handleClick(){
    console.log("click from app")
  },
  render() {
    var that = this
    var children = React.Children.map(this.props.children, function(child) {
        return React.cloneElement(child, Object.assign({}, that.state));
    });
    console.log(this.props.status)
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


