import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { socket } from '../../socket';
import { goToGame } from '../../../redux/profile';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    goToGame,
  }, dispatch)
);

const mapStateToProps = state => ({
  status: state.status,
  username: (state.playerInfo && state.playerInfo.username) || state.username,
  playerInfo: state.playerInfo,
  players: state.players,
  game: state.game,
});

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      roomName: '',
      profile: false,
    };
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }
  componentDidMount() {
    /** params {Object} gameInfo holds boolean, roomName, players*/
    socket.on('goToGame', (gameInfo) => {
      this.props.goToGame(gameInfo);
    });
  }

  handleRoomChange(event) {
    this.setState({ roomName: event.target.value });
  }

  joinRoom() {
    const { playerInfo } = this.props;
    socket.emit('enterGameRoom', {
      roomName: this.state.roomName,
      username: playerInfo.username,
    });
  }

  render() {
    const { location, players, game, playerInfo, username } = this.props;
    const { roomName } = this.state;
    return (
      <section className="profile">
        {playerInfo && (<div className={`profile__main ${location.pathname.includes('game') && 'profile__nav'}`}>
          <h1>Welcome {username}</h1>
          <h1>Total Game Wins: {playerInfo.wins}</h1>
          <label htmlFor="roomName">Join or Create a Room To Play</label>
          <input
            name="roomName"
            onChange={this.handleRoomChange}
            className="profile__input"
            placeholder="enter a room name..."
          />
          <button
            className="btn btn-primary"
            disabled={!roomName}
            onClick={this.joinRoom}
          >
            Enter Room
          </button>
          {players[0] && <h1>{players[0].username}</h1>}
          {players.length && _.map(players, (player, index) => (
            <h1 key={index}>{player.username}</h1>
          ))}
          {game && (
            <Link to={`/play/game/${game.id}`}>
              Go To Game
            </Link>
          )}
          <Link to="/logout">Logout</Link>
        </div>)}
        {this.props.children}
      </section>
    );
  }
}

Profile.propTypes = {
  goToGame: PropTypes.func.isRequired,
  children: PropTypes.element,
  playerInfo: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  gameId: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.any),
  game: PropTypes.objectOf(PropTypes.any),
  username: PropTypes.string,
};

Profile.defaultProps = {
  children: null,
  playerInfo: null,
  gameId: null,
  players: null,
  game: null,
  username: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
