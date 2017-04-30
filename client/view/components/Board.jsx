import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { socket } from '../../redux/connections';
import cardComponents from './cardComponents';
import checkSet from '../utils/checkSet';
import { addClickedCard } from '../../redux/game';

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
    this.handleCardClick = this.handleCardClick.bind(this);
    this.renderCards = this.renderCards.bind(this);
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
    const { clickedCards, addClickedCard } = this.props

    // check to see if card had been clicked
    let clicked = null;
    const cardNumbers = _.map(clickedCards, 'card');
    if (!_.includes(cardNumbers, card.card)) {
      clicked = [...clickedCards, card];
    } else {
      // remove obj from array
      clicked = _.filter(clickedCards, cardClick => card.card !== cardClick.card);
    }

    // if user has clicked on three cards
    if (clicked.length === 3) {
      // check if set
      if (checkSet(clicked)) {
        socket.emit('set', { clickedCards: clicked, gameId: game.id });
      }
      addClickedCard([]);
    } else {
      addClickedCard(clicked);
    }
  }

  /**
  * @param {Array.<object>} board. Dynamically render cards
  * based on the attributes recieved from the objects.
  * @returns {Array.<Components>}
  */
  renderCards() {
    return this.props.board.map((slot, i) => {
      /* define component.
      * imported all svg images into an object.
      * when certain attributes are triggered look inside the object and grab import information.
      * inorder to use that infomation as a component, it had to be saved in a variable
      */
       let Special = cardComponents[`${slot.shape}-${slot.shade}`];
      // render amount of shapes needed per card based on the card number attribute
      const number = [];
      for (let j = 0; j < slot.number; j += 1) {
        number.push(<Special key={j} className={`shapes ${slot.color}`} />);
      }
      return (
        <button
          className="card"
          key={i}
          onClick={() => this.handleCardClick(slot)}
        >
          {number}
        </button>
      );
    });
  }
  render() {
    const { board } = this.props
    return (
      <section className="board">
        {board && this.renderCards()}
      </section>
    );
  }
}

export default connect(appToState, mapDispatchToProps)(Board);
