import React from 'react';
import cardComponents from './cardComponents';

/**
* @param {Array.<object>} board. Dynamically render cards
* based on the attributes recieved from the objects.
* @returns {Array.<Components>}
*/
const renderCards = (board, handleCardClick) => board.map((slot, i) => {
  /* define component.
  * imported all svg images into an object.
  * when certain attributes are triggered look inside the object and grab import information.
  * inorder to use that infomation as a component, it had to be saved in a variable
  */
  const Special = cardComponents[`${slot.shape}-${slot.shade}`];
  // render amount of shapes needed per card based on the card number attribute
  const number = [];
  for (let j = 0; j < slot.number; j += 1) {
    number.push(<Special key={j} className={`shapes ${slot.color}`} />);
  }
  return (
    <button
      className={`card ${board.length === 15 && 'card15'} ${slot.clicked && 'clicked'}`}
      key={slot.id}
      onClick={() => handleCardClick(slot)}
    >
      {number}
    </button>
  );
});

export default renderCards;
