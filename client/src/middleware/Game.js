import Game from '../components/Game'
import {connect} from 'react-redux'

const appToState = state => {
return {
  member: state.landingPageReducer.member,
  amountOfConnections: state.landingPageReducer.amountOfConnections,
  players: state.gameReducer.players,
  board: state.gameReducer.board,
  cards: state.gameReducer.cards, 
  amountOfCardsOnBoard: state.gameReducer.amountOfCardsOnBoard
}}


export default connect(appToState)(Game)