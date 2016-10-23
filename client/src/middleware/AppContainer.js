import App from '../components/App'
import {connect} from 'react-redux'

const appToState = state => ({
  cards: state.cards,
  shuffledCards: state.shuffledCards,
  board: state.board,
  amountOfCardsOnBoard: state.amountOfCardsOnBoard,
  status: state.status,
  member: state.member,
  players: state.players
})


export default connect(appToState)(App)