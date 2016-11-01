import WaitingForPlayers from '../components/WaitingForPlayers'
import {connect} from 'react-redux'

const appToState = state => ({
  amountOfConnections: state.amountOfConnections,
  status: state.status,
  member: state.member,
  waitingPlayers: state.waitingPlayers,
  players: state.players
})


export default connect(appToState)(WaitingForPlayers)