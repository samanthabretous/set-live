import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Link, withRouter } from 'react-router';
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
    this.goToGameRoom = this.goToGameRoom.bind(this);
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

  goToGameRoom() {
    this.props.router.push(`/play/game/${game.id}`);
  }

  render() {
    const { location, game, playerInfo, username } = this.props;
    const { roomName } = this.state;
    return (
      <section className="profile">
        {playerInfo && (<div className={`profile__main ${location.pathname.includes('game') && 'profile__nav'}`}>
          <h1 className="profile__welcome">Welcome {username}</h1>
          <div className="profile__input-container">
            <label
              className="profile__input-label"
              htmlFor="roomName"
            >
              Join or Create a Room To Play
            </label>
            <input
              name="roomName"
              onChange={this.handleRoomChange}
              className="profile__input"
              placeholder="enter a room name..."
            />
          </div>
          <button
            className="profile__enter-button"
            disabled={!roomName}
            onClick={!game ? this.joinRoom : this.goToGameRoom}
          >
            Enter Room
          </button>
          <Link to="/logout">Logout</Link>
        </div>)}
        {this.props.children}
      </section>
    );
  }
}

Profile.propTypes = {
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  goToGame: PropTypes.func.isRequired,
  children: PropTypes.element,
  playerInfo: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
