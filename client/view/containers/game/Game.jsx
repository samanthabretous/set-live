import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goToGame, addClickedCard } from '../../../redux/game';

// components
import { Board, GameMenu } from '../../components';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    goToGame,
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
    // user refreshes the page get game again
    if (!this.props.game) {
      axios.get(`/api/game/id/${this.props.params.room}`)
      .then(({ data }) => {
        console.log("data", data)
        const gameInfo = {
          game: data,
          players: data.players
        }
        this.props.goToGame(gameInfo);
      });
    }
  }
  render() {
    console.log(this.props);
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
  goToGame: PropTypes.func.isRequired,
};

Game.defaultProps = {
  game: null,
};

export default connect(appToState, mapDispatchToProps)(Game);
