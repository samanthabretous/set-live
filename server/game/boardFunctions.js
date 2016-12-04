
//choose random card from fresh deck and add it to an array
const shuffleCards = (cards) => {
  let shuffled = [];
  for(let i = cards.length; i > 0; i--) {
    let randomInd = Math.floor(Math.random()*cards.length);
    let randomCard = cards[randomInd];
    shuffled.push(randomCard);
    cards.splice(randomInd, 1);
  }
  return shuffled
}


const generateBoard = (cardsToDisplay) => {

  // fill and array with null
  let board = []
  for(let i = 0; i < cardsToDisplay; i++){
    board.push(null)
  }
  return board
}

module.exports = {
  shuffleCards: shuffleCards,
  generateBoard: generateBoard
}
