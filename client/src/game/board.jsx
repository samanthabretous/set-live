import React from 'react'
import path from 'path'
import {socket} from '../actions/socket-listeners/connections'
import {CARDS} from '../actions/types'
import cardComponents from './cardComponents'


const Board = (props) => {
  let handleClick = () =>{

  }

  let boardOfCards = (board) => {
    console.log(board)
    let obj = []
    return board.map((slot,i) => {
      //let image = "/images/" + slot.shape + "-" + slot.shade + ".svg";
       let Special = cardComponents[slot.shape + '-' + slot.shade]
       let number = []
      for(let j = 0; j < slot.number; j++){
        number.push(<Special key={j} className={slot.color}/>)
      }
      return (
        <div className="card" key={i}>
        {number}
        </div>
      )
    })
  }

  return (
    <div>
      <div>Board</div>
      <section className="board">
        {boardOfCards(props.board)}
      </section>
    </div>
  )
}

export default Board