(function() {
  const deckOfCards = require('../game/card_deck')
  const boardFunctions = require('../game/boardFunctions')

  let Game = function(room, player){
    this.players = [player];
    this.room = room;
    this.board = boardFunctions.generateBoard(12);

    ////get a fresh deck of cards
    this.cards = boardFunctions.shuffleCards(deckOfCards); 
    this.playerTurn = null;

    //start playing
    this.started = false;
    this.maxPlayers = 2;
    this.roomFull = false;
  }

  Game.prototype.announcePlayers = function(socket, data) {
    if (socket) {
        socket.broadcast.to(this.room).emit('players', data);
    } else {
        io.sockets.in(this.room).emit('players', data);
    }
  }

  Game.prototype.isRoomFull = function() {
    return this.players.length >= this.maxPlayers ? true : false;
  }

  Game.prototype.start = function() {
    this.started = true;

    //select a random player to start the game
    let random = Math.floor(Math.random()*this.players.length)
    this.turn = this.players[random]
    //this.handCardsAndCoins();
    //this.announce({what : 'started', turn: this.turn})
  }

  Game.prototype.getPlayer = function() {
    for (var i in this.players){
      if (this.players[i].id === id) return this.players[i];
    }
    return null;
  }

  Game.prototype.dealCards = function(io) {
    let that = this;
    let fillBoard = this.board.map(slot => {

      //check to see if spot is empty
      if (null === slot) {
        let firstCard = this.cards[0]
        this.cards.splice(0,1)

        //fill spot with the next card in the deck
        return firstCard
      } else {
        return slot
      }
    })
    this.board = fillBoard;

    let promise = new Promise((resolve, reject) => {
      if (this.board[0] !== null) resolve(that.board);
      else reject(Error("It broke"));
    });

    promise.then((result)=>{
      io.sockets.in(that.room).emit('board', result);
    })
    .catch(err => console.log(err))
  }

  module.exports = Game

})();