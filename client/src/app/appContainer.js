import App from './App'
import {connect} from 'react-redux'

const appToState = state => ({
  member: state.landingPageReducer.member,
  roomName: state.gameReducer.roomName,
  players: state.gameReducer.players,
})


export default connect(appToState)(App)