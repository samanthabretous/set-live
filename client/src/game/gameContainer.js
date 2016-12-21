import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/gameActions'
import Game from './Game'

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
)

const appToState = state => {
return {
  member: state.landingPageReducer.member,
  roomName: state.gameReducer.roomName,
  players: state.gameReducer.players,
  playerHasLeft: state.gameReducer.playerHasLeft,
  board: state.gameReducer.board,
  cards: state.gameReducer.cards, 
  modalStatus: state.gameReducer.modalStatus,
  clickedCards: state.gameReducer.clickedCards,
}}


export default connect(appToState, mapDispatchToProps)(Game)