import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {inviteModalAction} from '../actions'
import Game from '../components/Game'

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({inviteModalAction}, dispatch)
)

const appToState = state => {
return {
  roomName: state.game.roomName,
  players: state.game.players,
  playerHasLeft: state.game.playerHasLeft,
  board: state.game.board,
  cards: state.game.cards, 
  modalStatus: state.game.modalStatus,
  clickedCards: state.game.clickedCards,
  gameRoom: state.game.gameRoom
}}


export default connect(appToState, mapDispatchToProps)(Game)