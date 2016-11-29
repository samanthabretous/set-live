import LandingPage from '../components/LandingPage'
import {connect} from 'react-redux'

const appToState = state => {
  console.log(state)
  return{
  amountOfConnections: state.mainReducer.amountOfConnections,
  status: state.mainReducer.status,
  member: state.mainReducer.member,
  waitingPlayers: state.mainReducer.waitingPlayers,
  players: state.mainReducer.players,
  username: state.landingPageReducer.username
}}


export default connect(appToState)(LandingPage)