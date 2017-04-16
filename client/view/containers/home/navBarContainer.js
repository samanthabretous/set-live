import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from '../components/NavBar';

const mapDispatchToProps = dispatch => (
  bindActionCreators({

  }, dispatch)
);

const mapStateToProps = state => ({
  status: state.game.status,
  username: state.login.username,
  roomName: state.game.roomName,
  gameId: state.game.gameId,
  playerInfo: state.game.playerInfo,
});


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
