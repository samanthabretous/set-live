import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {inviteModalAction} from '../actions'
import Game from '../components/Game'

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({inviteModalAction}, dispatch)
)

const appToState = state => {
  console.log("game container")
return {
  roomName: state.game.roomName,
  players: state.game.players,
  playerHasLeft: state.game.playerHasLeft,
  board: state.game.board,
  cards: state.game.cards, 
  modalStatus: state.game.modalStatus,
  clickedCards: state.game.clickedCards,
  gameId: state.game.gameId, 
  deck: state.game.deck,
}}


export default connect(appToState, mapDispatchToProps)(Game)