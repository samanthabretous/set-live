import React from 'react'

const Board = React.createClass({
  getInitialState(){

  },
  generateBoard(){
    
    //find the width, based on the user input of cards
    let amountDisplay = this.props.parentApp.state.amountCardsDisplay
    let boardWidth = Math.floor(amountDisplay/3)
    
    //make an empty matrix
    let board = []
    for(let i = 0; i < boardWidth; i++){
      board.push([])
      for(let j = 0; j < 3; j++){
        board[i].push(null)
      }
    }
    this.props.parentAppSetState({board:board})
    console.log("board1", board)
    this.fillBoard()
    
    
  },
  fillBoard(){
    console.log("fill")
    var newBoard = this.props.parentApp.state.board.map(function(row){
      row.map(function(slot){
        if(slot == null){
          return "filled slot"
        } else {
          return "slot"
        }
      })
    })
    this.props.parentApp.setState({board:newBoard})
    console.log(this.props.parentApp.state.board)
  },
  componentDidMount(){
    console.log("did mount")
    this.generateBoard()
  },
  render() {
    return (
      <div>Board</div>
    )
  }
})

export default Board