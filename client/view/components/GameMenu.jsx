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
  playerHasLeft: state.playerHasLeft,
  playerSet: state.playerSet,
  playerInfo: state.playerInfo,
});

class GameMenu extends Component {
  constructor() {
    super();
    this.state = {};
    this.startGame = this.startGame.bind(this);
  }
  componentDidMount() {
    socket.on('gameStarted', () => {
      console.log('socket received');
      this.props.gameStarted();
    });
  }
  startGame() {
    console.log('clicked', this.props.game.id, this.props.game.room);
    socket.emit('startNewGame', { gameId: this.props.game.id, room: this.props.game.room });
  }
  render() {
    const { playerInfo, game } = this.props;
    return (
      <aside>
        <Link to="/how-to-play">Instructions</Link>
        <h2>Hi {playerInfo.username}!</h2>
        <p>{game.players.length} players connected to Room: {game.room}</p>
        <ul>
          {game.players.map(player => <li key={player.id}>{player.username}</li>)}
        </ul>
        <button
          className="gameMenu__start"
          onClick={this.startGame}
        >Start New Game</button>
        {!game.started && <p>Invite your friends to room {game.room}</p>}
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
  playerInfo: PropTypes.objectOf(PropTypes.any),
  game: PropTypes.objectOf(PropTypes.any),
};

export default connect(appToState, mapDispatchToProps)(GameMenu);
