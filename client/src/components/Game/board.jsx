import React from 'react'
import {socket} from '../../actions/socket-listeners/connections'
import {CARDS} from '../../actions/types'

const Board = React.createClass({
  generateBoard(){
    //find the width, based on the user input of cards
    let amountDisplay = this.props.amountOfCardsOnBoard

    //make an empty matrix
    let board = []
    for(let i = 0; i < amountDisplay; i++){
      board.push(null)
    }
    //this.fillBoard()
  },
  componentDidMount(){
    console.log("will mount")
    //this.generateBoard()
  },
  fillBoard(board) {
    let newBoard = board.map(slot => {
      if (null === slot) {
        var firstCard = this.state.shuffledCards[0]
        this.setState({shuffledCards: this.state.shuffledCards.splice(0,1)})
        return firstCard
      } else {
        return slot
      }
    })
    this.setState({board: newBoard})
  },
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