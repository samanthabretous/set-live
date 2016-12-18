import LandingPage from './LandingPage'
import {connect} from 'react-redux'

const appToState = state => ({
  status: state.landingPageReducer.status,
  username: state.landingPageReducer.username,
  roomName: state.landingPageReducer.roomName,
  roomStatus: state.landingPageReducer.roomStatus,
})


export default connect(appToState)(LandingPage)