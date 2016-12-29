import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Profile from '../components/Profile';
import {generateRoomName} from '../actions';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    generateRoomName, 
  }, dispatch)
)

const mapStateToProps = state => ({
  status: state.game.status,
  username: state.login.username,
  roomName: state.game.roomName,
  game: state.game.game,
  playerInfo: state.game.playerInfo,
})


export default connect(mapStateToProps, mapDispatchToProps)(Profile)