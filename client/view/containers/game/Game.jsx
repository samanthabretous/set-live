import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { inviteModalAction, addClickedCard } from '../../../redux/gameActions';

// components
import { Board, GameMenu } from '../../components';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    inviteModalAction,
    addClickedCard,
  }, dispatch)
);

const appToState = state => ({
  roomName: state.roomName,
  players: state.players,
  playerHasLeft: state.playerHasLeft,
  board: state.board,
  cards: state.cards,
  clickedCards: state.clickedCards,
  gameId: state.gameId,
  deck: state.deck,
  playerSet: state.playerSet,
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
