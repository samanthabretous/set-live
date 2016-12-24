import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import store from '../store'

//components
import Display from '../app/Display'
import Board from './Board';
import ChatBar from './chatBar';
import {MODAL_STATUS} from '../actions/types'

import isSetOnBoard from './isSetOnBoard'

const Game = React.createClass({
  componentDidMount(){
    setTimeout(() => {
      console.log('timeout')
      store.dispatch({
        type: MODAL_STATUS, 
        modalStatus: false
      }) 
    }, 5000)
  },
  render(){
    return (
      <div className="gameView">
        {this.props.board.length > 0 && <Board {...this.props}/>}
      </div>
    )
  }
})

export default Game;
