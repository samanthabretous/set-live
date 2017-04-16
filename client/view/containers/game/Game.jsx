import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { inviteModalAction, addClickedCard } from '../../../redux/actions/gameActions';

// components
import { Board, GameMenu } from '../../components';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    inviteModalAction,
    addClickedCard,
  }, dispatch)
);

const appToState = state => ({
  roomName: state.game.roomName,
  players: state.game.players,
  playerHasLeft: state.game.playerHasLeft,
  board: state.game.board,
  cards: state.game.cards,
  clickedCards: state.game.clickedCards,
  gameId: state.game.gameId,
  deck: state.game.deck,
  playerSet: state.game.playerSet,
});

class Game extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      // props.inviteModalAction(false)
    }, 5000);
  }
  render() {
    return (
      <section className="gameView">
        <GameMenu {...this.props} />
        {this.props.deck.length > 0 && <Board {...this.props} />}
      </section>
    );
  }
}

export default connect(appToState, mapDispatchToProps)(Game);
