import React, { Component, PropTypes } from 'react';
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
  game: state.game,
  deck: state.deck,
  playerSet: state.playerSet,
});

class Game extends Component {
  componentDidMount() {
    setTimeout(() => {
      // props.inviteModalAction(false)
    }, 5000);
  }
  render() {
    return (
      <section className="gameView">
        {this.props.game && <GameMenu />}
        {this.props.deck.length > 0 && <Board {...this.props} />}
      </section>
    );
  }
}

Game.propTypes = {
  game: PropTypes.objectOf(PropTypes.any),
};

export default connect(appToState, mapDispatchToProps)(Game);
