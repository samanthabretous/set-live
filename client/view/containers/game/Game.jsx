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
  game: state.game,
});

class Game extends Component {

  render() {
    console.log(this.props);
    return (
      <section className="gameView">
        <GameMenu />
        <Board {...this.props} />
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
