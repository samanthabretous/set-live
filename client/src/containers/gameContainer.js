import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {inviteModalAction, addClickedCard} from '../actions/gameActions'
import Game from '../components/Game'

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    inviteModalAction, addClickedCard
  }, dispatch)
)

const appToState = state => {
  console.log(state.game.players)
return {
  roomName: state.game.roomName,
  players: state.game.players,
  playerHasLeft: state.game.playerHasLeft,
  board: state.game.board,
  cards: state.game.cards, 
  clickedCards: state.game.clickedCards,
  gameId: state.game.gameId, 
  deck: state.game.deck,
  playerSet: state.game.playerSet,
}}


export default connect(appToState, mapDispatchToProps)(Game)