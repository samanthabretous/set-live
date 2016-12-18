import Game from './Game'
import {connect} from 'react-redux'

const appToState = state => {
return {
  member: state.landingPageReducer.member,
  roomName: state.gameReducer.roomName,
  players: state.gameReducer.players,
  board: state.gameReducer.board,
  cards: state.gameReducer.cards, 
  amountOfCardsOnBoard: state.gameReducer.amountOfCardsOnBoard,
  modalStatus: state.gameReducer.modalStatus,

}}


export default connect(appToState, mapDispatchToProps)(Game)