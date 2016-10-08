import React from 'react';
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import cards from './parts/card_deck' 


//import "../css/style.css";


const App = React.createClass({
  getInitialState(){
    return {
      cards: cards,
      board: [],
      amountOfCardsOnBoard: 12,
      generateBoard: this.generateBoard,
      handleClick: this.handleClick,
      status: 'disconnected',
      member: {},
      players: [],
      emit: this.emit
    }
  },

  componentWillMount(){
    this.socket= io("http://localhost:3000");
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect)
    this.socket.on('welcome', this.updateState);
    this.socket.on('players', this.updateAudience);
    this.socket.on('joined', this.joined)
  },
    emit(eventName, payload){
    this.socket.emit(eventName, payload);
  },

  //alert user that they are connected
  connect() {

    //check to see if the member had refreshed
    let member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
    console.log(member)
    if(member && member.type ==="audience") {
      console.log('enter')
      this.emit('joined', member)
    }

    this.setState({status: 'connected'});
  },

  disconnect() {
    this.setState({
      status: 'disconnected',
    });
  },

  updateState(serverState) {
    this.setState(serverState)
  },

  joined(member){

    //save member in browser history
    sessionStorage.member = JSON.stringify(member)
    this.setState({member: member})
  },

  updatePlayers(newPlayer){
    this.setState({players: newPlayer})
  },

  generateBoard(board) {
    console.log("generateBoard")
    console.log(board)
    let newBoard = board.map(row => row.map(slot => null === slot ? "slot" : "filled"))
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
    console.log("app board", this.state.board)
    return (
      <div>
        <h1>Set Game</h1>
        {children}
      </div>
    )
  }
})

export default App


