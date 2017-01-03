import _ from 'lodash'
import { UPDATE_CARDS, ADD_PLAYER, INVITE_PLAYERS, BOARD, LEFT_PLAYER, GO_TO_GAME, GAME_STARTED, RELOAD_GAME, UPDATE_GAME } from './types';
import {socket} from './connections'

export default (store) => {
  socket.on('updateCards', cards =>{
    store.dispatch({
      type: UPDATE_CARDS,
      cards
    })
  })
  socket.on('addPlayer', player =>{
    store.dispatch({
      type: ADD_PLAYER,
      player
    })
  });

  socket.on('leftPlayer', (playerHasLeft)=>{
    console.log(playerHasLeft)
    store.dispatch({
      type: LEFT_PLAYER,
      playerHasLeft
    })
  });

  /*params {Object} gameInfo holds boolean, roomName, players*/
  socket.on('goToGame', gameInfo =>{
    store.dispatch({
      type: GO_TO_GAME,
      gameInfo
    })
  })

  const sortCards = (cards) => {
    return _.sortBy(cards, [(card) => {
      return card['deck_of_cards'].cardOrder
    }])
  }
  socket.on('gameStarted', cards =>{
    const deck = sortCards(cards)
    store.dispatch({
      type: GAME_STARTED,
      deck,
      board: deck.splice(0,12)
    })
  })

  socket.on('reloadGame', payload => {
    const {cards, started, players, game} = payload;
    console.log(payload)
    const deck = sortCards(cards)
    store.dispatch({
      type: RELOAD_GAME,
      deck,
      started,
      players,
      game,
      board: deck.splice(0,12)
    })
  })

  socket.on('updateGame', payload => {
    console.log("update",payload)
    const {cards, playerSet} = payload
    const deck = sortCards(cards)
    store.dispatch({
      type: UPDATE_GAME,
      deck,
      board: deck.splice(0,12), 
      playerSet
    })
  })
}