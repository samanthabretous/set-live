import React from 'react'

const Board = React.createClass({
  getInitialState(){
    return {gameBoard: [], name: ''}
  },
  generateBoard(){
    //find the width, based on the user input of cards
    let amountDisplay = this.props.amountOfCardsOnBoard

    //make an empty matrix
    let board = []
    for(let i = 0; i < amountDisplay; i++){
      board.push(null)
    }
    this.props.fillBoard(board)

  },
  componentWillMount(){
    console.log("will mount")
    this.generateBoard()
  },
  render() {
    console.log("render")
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