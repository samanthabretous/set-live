import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import checkSet from './checkSet';
import renderCards from './renderCards';
import { socket } from '../../../redux/connections';
import { addClickedCard } from '../../../redux/game';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addClickedCard,
  }, dispatch)
);

const appToState = state => ({
  game: state.game,
  board: state.board,
  clickedCards: state.clickedCards,
});

class Board extends Component {
  constructor() {
    super();
    this.state = {
      showResults: false,
    };
    this.handleCardClick = this.handleCardClick.bind(this);
    this.showIfSetOrNot = this.showIfSetOrNot.bind(this);
  }
  /**
  * @param {Object} card. when user clicks on card
  * check to see if that card has been clicked on.
  * if it has not send it to the store and add class.
  * else remove the clicked card from store and remove * class.
  * if three cards are clicked check to see they are a * set
  * @returns {}
  */
  handleCardClick(card) {
    const { clickedCards, addClickedCard, game } = this.props

    // check to see if card had been clicked
    let clicked = null;
    const cardNumbers = _.map(clickedCards, 'card');
    if (!_.includes(cardNumbers, card.card)) {
      clicked = [...clickedCards, card];
      card.clicked = true;
    } else {
      // remove obj from array
      delete card.clicked;
      clicked = _.filter(clickedCards, cardClick => card.card !== cardClick.card);
    }

    const clearClickedCards = () => {
      clicked.forEach(cardObj => delete cardObj.clicked);
      addClickedCard([]);
    };
    // if user has clicked on three cards, check set
    if (clicked.length === 3 && checkSet(clicked)) {
      console.log('set', clickedCards);
      socket.emit('set', { clickedCards: clicked, gameId: game.id });
      clearClickedCards();
    } else if (clicked.length === 3) {
      clearClickedCards();
    } else {
      addClickedCard(clicked);
    }
  }


  showIfSetOrNot() {

  }
  render() {
    const { game, board } = this.props;
    return (
      <section className="board">
        {game.started
          ? renderCards(board, this.handleCardClick)
          : (<div>
            <h2>Invite your friends to Join</h2>
            <h1>{game.room}</h1>
          </div>)}
        {this.state.showResults && <p>Not a set</p>}
      </section>
    );
  }
}

Board.propTypes = {
  addClickedCard: PropTypes.func.isRequired,
  board: PropTypes.arrayOf(PropTypes.object).isRequired,
  clickedCards: PropTypes.arrayOf(PropTypes.any),
  game: PropTypes.objectOf(PropTypes.any).isRequired,
};

Board.defaultProps = {
  clickedCards: [],
};

export default connect(appToState, mapDispatchToProps)(Board);
