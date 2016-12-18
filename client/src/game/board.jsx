import React from 'react'
import path from 'path'
import {socket} from '../actions/socket-listeners/connections'
import {CARDS} from '../actions/types'

const Board = (props) => {
  let handleClick = () =>{

  }

  let boardOfCards = (board) => {
    console.log(board)
    return board.map((slot,i) => {
      let image = "/../../../public/images/" + slot.shape + "-" + slot.shade + ".svg";
      return <img key={i} src={image} />
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