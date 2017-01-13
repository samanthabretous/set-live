import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Profile from '../components/Profile';
import {generateRoomName} from '../actions';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    generateRoomName, 
  }, dispatch)
)

const mapStateToProps = state => {
  console.log(state.game.players)
  console.log("gameId",state.game.gameId)
return {
  status: state.game.status,
  username: state.login.username,
  roomName: state.game.roomName,
  gameId: state.game.gameId,
  playerInfo: state.game.playerInfo,
  players: state.game.players,
}}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)