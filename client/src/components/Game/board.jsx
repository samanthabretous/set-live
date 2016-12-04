import React from 'react'
import {socket} from '../../actions/socket-listeners/connections'
import {CARDS} from '../../actions/types'

const Board = React.createClass({
  render() {
    let boardOfCards = this.props.board.map((slot,i) => <article onClick={this.props.handleClick} key={i} className="cards">{slot.card}</article>)
    return (
      <div>
        <div>Board</div>
        <section className="board">
          {boardOfCards}
        </section>
      </div>
    )
  }
})

export default Board