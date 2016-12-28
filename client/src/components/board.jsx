import React from 'react'
import path from 'path'
import _ from 'lodash'
import {socket} from '../actions/connections'
import {CARDS} from '../actions/types'
import cardComponents from './cardComponents'


const Board = (props) => {

  let {clickedCards, board, addClickedCard} = props

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
    let cardNumbers = _.map(clickedCards, 'card')
    if(! _.includes(cardNumbers, card.card)) {
      var clicked = [...clickedCards, card]
    } else {
      //remove obj from array
      var clicked = _.filter(clickedCards, (cardClick) => card.card !== cardClick.card)
    }
    console.log(clicked)
    if(clicked.length === 3) {
      //check if set
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
  let boardOfCards = (board) => {
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
        {boardOfCards(board)}
      </section>
    </div>
  )
}

export default Board