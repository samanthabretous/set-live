import React from 'react'
import path from 'path'
import _ from 'lodash'
import {socket} from '../actions/connections'
import cardComponents from './cardComponents'
import checkSet from '../utils/checkSet'


const Board = (props) => {

  const {gameId, clickedCards, board, addClickedCard, deck} = props

  /* 
  * @param {Object} card. when user clicks on card 
  * check to see if that card has been clicked on.
  * if it has not send it to the store and add class. 
  * else remove the clicked card from store and remove * class.
  * if three cards are clicked check to see they are a * set
  * @returns {}
  */
  let handleCardClick = (card) => {
    console.log("clicked")

    //check to see if card had been clicked
    // let clicked = _.filter(clickedCards, (cardClick) =>
    //   card.card !== cardClick.card 
    // )
    const cardNumbers = _.map(clickedCards, 'card')
    if(! _.includes(cardNumbers, card.card)) {
      var clicked = [...clickedCards, card]
    } else {
      //remove obj from array
      var clicked = _.filter(clickedCards, (cardClick) => card.card !== cardClick.card)
    }
    console.log(clicked)
    if(clicked.length === 3) {
      //check if set
      //if(checkSet(clicked)){
        socket.emit('set', {clickedCards: clicked, gameId,  })
      //}
      addClickedCard([])
    } else {
      addClickedCard(clicked)
    }
    
    //if user has clicked on three cards
    // if(clickedCards.length===3){
    //   //check if set
    // }
    
  };

  /* 
  * @param {[Objects]} board. Dynamically render cards 
  * based on the attributes recieved from the objects.
  * @returns {[Components]}
  */
  let boardOfCards = () => {
    return board.map((slot,i) => {

      // define component. imported all svg images into an object. when certain attributes are triggered look inside the object and grab import information. inorder to use that infomation as a component, it had to be saved in a variable 
       let Special = cardComponents[`${slot.shape}-${slot.shade}`]
      
      //render amount of shapes needed per card based on the card number attribute
      let number = []
      for(let j = 0; j < slot.number; j++){
        number.push(<Special key={j} className={`shapes ${slot.color}`}/>)
      }
      return (
        <div 
          className="card"
          key={i}
          onClick={()=>handleCardClick(slot)}
        >
        {number}
        </div>
      )
    })
  }

  return (
    <div>
      <div>Board</div>
      <section className="board">
        {board && boardOfCards()}
      </section>
    </div>
  )
}

export default Board