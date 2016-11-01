import Game from '../components/Game'
import {connect} from 'react-redux'

const appToState = state => ({
  players: state.players,
  board: state.board,
  cards: state.cards, 
  amountOfCardsOnBoard: state.amountOfCardsOnBoard
})


export default connect(appToState)(Game)