import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import checkSet from './checkSet';
import renderCards from './renderCards';
import { socket } from '../../socket';
import { addClickedCard, updateCards } from '../../../redux/game';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addClickedCard,
    updateCards,
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
      playerSet: null,
    };
    this.handleCardClick = this.handleCardClick.bind(this);
  }
  componentDidMount() {
    socket.on('updateCards', ({ cards, playerSet }) => {
      this.props.updateCards(cards);
      this.setState({ playerSet, showResults: true });

      // this is so there is a quick flash as to who got the last set
      setTimeout(() => {
        this.setState({ showResults: false, playerSet: null });
      }, 1500);
    });
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
    if (clicked.length === 3 /*&& checkSet(clicked)*/) {
      console.log('set', clicked);
      socket.emit('set', { clickedCards: clicked, gameId: game.id, room: game.room });
      clearClickedCards();
    } else if (clicked.length === 3) {
      clearClickedCards();
      this.setState({ showResults: true });
      setTimeout(() => {
        this.setState({ showResults: false });
      }, 1500);
    } else {
      addClickedCard(clicked);
    }
  }
  render() {
    const { game, board } = this.props;
    const { showResults, playerSet } = this.state;
    return (
      <section className="board">
        {game.started
          ? renderCards(board, this.handleCardClick)
          : (<div>
            <h2>Invite your friends to Join</h2>
            <h1>{game.room}</h1>
          </div>)}
        {showResults && playerSet && <p className="flash_message">Set by {this.state.playerSet}</p>}
        {showResults && <p className="flash_message">Not a set</p>}
      </section>
    );
  }
}

Board.propTypes = {
  addClickedCard: PropTypes.func.isRequired,
  updateCards: PropTypes.func.isRequired,
  board: PropTypes.arrayOf(PropTypes.object).isRequired,
  clickedCards: PropTypes.arrayOf(PropTypes.any),
  game: PropTypes.objectOf(PropTypes.any).isRequired,
};

Board.defaultProps = {
  clickedCards: [],
};

export default connect(appToState, mapDispatchToProps)(Board);
