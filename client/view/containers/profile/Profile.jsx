import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { socket } from '../../../redux/connections';
import { generateRoomName } from '../../../redux/profile';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    generateRoomName,
  }, dispatch)
);

const mapStateToProps = state => ({
  status: state.status,
  username: state.username,
  roomName: state.roomName,
  gameId: state.gameId,
  playerInfo: state.playerInfo,
  players: state.players,
});

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  handleRoomChange(event) {
    this.props.generateRoomName(event.target.value);
  }

  joinRoom() {
    const { roomName, playerInfo } = this.props;
    socket.emit('enterGameRoom', {
      roomName,
      username: playerInfo.username,
    });
  }

  render() {
    const { params, players, gameId, roomName, playerInfo } = this.props;
    return (
      (!params.room &&
      <div className="landingPage">
        <h1>Profile Page</h1>
        {playerInfo && (<div>
          <h1>Username: {playerInfo.username}</h1>
          <h1>Total Game Wins: {playerInfo.wins}</h1>
        </div>)}
        <div>
          <input
            onChange={this.handleRoomChange}
            className="landingInput"
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
          {gameId && (
            <Link to={`/game/${gameId}`}>
              Go To Game
            </Link>
          )}
          <Link to="/logout">Logout</Link>
        </div>
      </div>)
    );
  }
}

Profile.propTypes = {
  generateRoomName: PropTypes.func.isRequired,
  roomName: PropTypes.string,
  playerInfo: PropTypes.objectOf(PropTypes.any),
  gameId: PropTypes.number,
};

Profile.defaultProps = {
  roomName: '',
  gameId: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
