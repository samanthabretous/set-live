import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LandingPage from '../components/LandingPage';
import {generateRoomName, formUsernameAction} from '../actions';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    generateRoomName, 
    formUsernameAction
  }, dispatch)
)

const mapStateToProps = state => ({
  status: state.game.status,
  username: state.login.username,
  roomName: state.game.roomName,
})


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)