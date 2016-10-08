import React from 'react'

const Board = React.createClass({
  getInitialState(){
    return {gameBoard: [], name: ''}
  },
  makeBoard(){
    //find the width, based on the user input of cards
    let amountDisplay = this.props.amountOfCardsOnBoard
    let boardWidth = Math.floor(amountDisplay/3)

    //make an empty matrix
    let board = []
    for(let i = 0; i < boardWidth; i++){
      board.push([])
      for(let j = 0; j < 3; j++){
        board[i].push(null)
      }
    }
    this.props.generateBoard(board)

  },
  componentWillMount(){
    console.log("will mount")
    this.makeBoard()
  },
  render() {
    console.log("render")
    console.log(this.props.board)
    return (
      <div>
        <div>Board</div>
      </div>
    )
  }
})

export default Board