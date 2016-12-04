import React from 'react'
import {socket} from '../../actions/socket-listeners/connections'
import {CARDS} from '../../actions/types'

const Board = (props) => {
  let handleClick = () =>{

  }

  let boardOfCards = (board) => {
    console.log(board)
    return board.map((slot,i) => 
      <article onClick={handleClick} key={i} className="cards">{slot.card}</article>
    )
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