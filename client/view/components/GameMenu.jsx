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
        <h2 className="username">Hi {playerInfo.username}!</h2>
        <div className="players">
          <h1>{game.room}</h1>
          <p className="players__connected">{game.players.length} players connected</p>
          <ul className="players__list">
            {game.players.map(player => <li key={player.id}>
              {player.username === playerInfo.username ? 'YOU' : player.username}
            </li>)}
          </ul>
        </div>

        <button
          className="gameMenu__start"
          onClick={this.startGame}
        >{game.started ? 'Create New Game' : 'Start Game'}</button>
        <button
          disabled={board.length > 12}
          onClick={this.addCards}
          className="gameMenu__addCards"
        >
          Add 3 More Cards
        </button>
        <div className="gameMenu__links">
          <Link to="/how-to-play">Instructions</Link>
          <Link to="/logout">Logout</Link>
        </div>
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
