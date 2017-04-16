import React from 'react';
import _ from 'lodash';
import { socket } from '../../redux/actions/connections';
import cardComponents from './cardComponents';
import checkSet from '../utils/checkSet';

const Board = (props) => {
  const { gameId, clickedCards, board, addClickedCard, deck } = props

  /**
  * @param {Object} card. when user clicks on card
  * check to see if that card has been clicked on.
  * if it has not send it to the store and add class.
  * else remove the clicked card from store and remove * class.
  * if three cards are clicked check to see they are a * set
  * @returns {}
  */
  const handleCardClick = (card) => {
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
        socket.emit('set', { clickedCards: clicked, gameId });
      }
      addClickedCard([]);
    } else {
      addClickedCard(clicked);
    }
  };

  /**
  * @param {Array.<object>} board. Dynamically render cards
  * based on the attributes recieved from the objects.
  * @returns {Array.<Components>}
  */
  const boardOfCards = () => (
    board.map((slot, i) => {
      /* define component.
      * imported all svg images into an object.
      * when certain attributes are triggered look inside the object and grab import information.
      * inorder to use that infomation as a component, it had to be saved in a variable
      */
       let Special = cardComponents[`${slot.shape}-${slot.shade}`];
      // render amount of shapes needed per card based on the card number attribute
      const number = [];
      for (let j = 0; j < slot.number; j++) {
        number.push(<Special key={j} className={`shapes ${slot.color}`} />);
      }
      return (
        <div
          className="card"
          key={i}
          onClick={() => handleCardClick(slot)}
        >
          {number}
        </div>
      );
    })
  );

  return (
    <section className="board">
      {board && boardOfCards()}
    </section>
  );
};

export default Board;
