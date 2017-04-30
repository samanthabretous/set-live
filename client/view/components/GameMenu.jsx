import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { socket } from '../socket';
import { gameStarted, changeBoardLength } from '../../redux/game';


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    gameStarted,
    changeBoardLength,
  }, dispatch)
);

const appToState = state => ({
  game: state.game,
  board: state.board,
  playerHasLeft: state.playerHasLeft,
  playerSet: state.playerSet,
  playerInfo: state.playerInfo,
});

class GameMenu extends Component {
  constructor() {
    super();
    this.state = {};
    this.startGame = this.startGame.bind(this);
    this.addCards = this.addCards.bind(this);
  }
  componentDidMount() {
    socket.on('gameStarted', () => {
      this.props.gameStarted();
    });
    socket.on('addMoreCardsToBoard', ({ boardLength }) => {
      this.props.changeBoardLength(boardLength);
    });
  }
  startGame() {
    const { game: { id, room, started } } = this.props;
    if (started) {
      // start a whole new game
      socket.emit('startNewGame', { room });
    } else {
      // let all users know the game is starting
      socket.emit('startGame', { gameId: id, room });
    }
  }
  addCards() {
    socket.emit('updateBoardLength', {
      gameId: this.props.game.id,
      room: this.props.game.room,
      currentBoardLength: this.props.board.length,
    });
  }
  render() {
    const { playerInfo, game, board } = this.props;
    return (
      <aside>
        <Link to="/how-to-play">Instructions</Link>
        <h2>Hi {playerInfo.username}!</h2>
        <p>{game.players.length} players connected to Room: {game.room}</p>
        <ul>
          {game.players.map(player => <li key={player.id}>
            {player.username === playerInfo.username ? 'YOU' : player.username}
          </li>)}
        </ul>
        <button
          className="gameMenu__start"
          onClick={this.startGame}
        >{game.started ? 'Create New Game' : 'Start Game'}</button>
        {!game.started && <p>Invite your friends to room {game.room}</p>}
        <button
          disabled={board.length > 12}
          onClick={this.addCards}
        >
          Add More Cards to board
        </button>
        <Link to="/logout">Logout</Link>
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
  changeBoardLength: PropTypes.func.isRequired,
  playerInfo: PropTypes.objectOf(PropTypes.any),
  game: PropTypes.objectOf(PropTypes.any),
  board: PropTypes.arrayOf(PropTypes.object),
};

GameMenu.defaultProps = {
  playerInfo: null,
  game: null,
  board: null,
};

export default connect(appToState, mapDispatchToProps)(GameMenu);
