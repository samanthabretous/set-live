const getPlayer = () => {
  for (let i in this.players) {
    if (this.players[i].id === id) return this.players[i];
  }
  return null;
};

/* @params {Object} game
* fill board with cards where there is space available
* returns {Object} with new deck and new board
*/
const dealCards = (game) => {

  const deck = game.deck;
  const board = game.board;

  const fillBoard = board.map((slot) => {
    // check to see if spot is empty
    if (slot === false) {
      const firstCard = deck[0];
      if (deck.length > 0) {
        deck.splice(0, 1);
      }
      // fill spot with the next card in the deck
      return firstCard;
    } else {
      return slot;
    }
  });
  return { deck, board: fillBoard };
};

module.exports = {
  getPlayer,
  dealCards,
};
