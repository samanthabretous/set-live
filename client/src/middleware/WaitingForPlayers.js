import WaitingForPlayers from '../components/WaitingForPlayers'
import {connect} from 'react-redux'

const appToState = state => {
  console.log(state)
  return {
    status: state.status,
    member: state.member,
    players: state.players
  }
}


export default connect(appToState)(WaitingForPlayers)