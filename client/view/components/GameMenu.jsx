import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { socket } from '../socket';
import { gameStarted } from '../../redux/game';


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    gameStarted,
  }, dispatch)
);

const appToState = state => ({
  game: state.game,
});

// components
import Modal from './Modal';

class GameMenu extends Component {
  constructor() {
    super();
    this.state = {};
    this.startGame = this.startGame.bind(this);
  }
  componentDidMount() {
    socket.on('gameStarted', (cards, board) => {
      // const deck = sortCards(cards);
      // const board = deck.splice(0, 12);
      gameStarted(cards, board);
    });
  }
  startGame() {
    socket.emit('startNewGame', this.props.game.id);
  }
  render() {
    return (
      <aside className="gameInfo">
        {/* <h1>Joined {member.name}</h1>
        <p>{players.length} players connected to Room: {roomName.roomName}</p>
        players.map((player, index)=> <p key={index}>PLAYER {index + player.name}</p>) */}
        <li><Link to="/how-to-play">About</Link></li>
        <button onClick={() => this.startGame()}>Start New Game</button>
        {/*
          roomName && modalStatus &&
            <Modal />
        */}
        {/* playerSet && <h4>Last Set By: {playerSet}</h4>*/}
      </aside>
    );
  }
}

GameMenu.propTypes = {
  gameStarted: PropTypes.func.isRequired,
};

export default connect(appToState, mapDispatchToProps)(GameMenu);
