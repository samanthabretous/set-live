(function() {
  const deckOfCards = require('../game/card_deck')

  let shuffleCards = (cards) => {
    let shuffled = [];
    for(let i = cards.length; i > 0; i--) {
      let randomInd = Math.floor(Math.random()*cards.length);
      let randomCard = cards[randomInd];
      shuffled.push(randomCard);
      cards.splice(randomInd, 1);
    }
    return shuffled
  }

  let Game = function(room, player){
    this.players = [player];
    this.room = room;
    this.board = [];

    ////get a fresh deck of cards
    this.cards = null//shuffleCards(deckOfCards); 
    this.playerTurn = null;

    //start playing
    this.started = false;
    this.maxPlayers = 2;
    this.roomFull = false;
  }

  Game.prototype.announce = function(data, socket) {
    if (socket) {
        socket.broadcast.to(this.name).emit('announce', data);
    } else {
        io.sockets.in(this.name).emit('announce',data);
    }
  }

  Game.prototype.isRoomFull = function() {
    return this.players.length >= this.maxPlayers ? true : false;
  }

  Game.prototype.start = function() {
    this.started = true;
    let random = Math.floor(Math.random()*this.players.length)
    let player = this.players[random];
    this.turn = {
        id : player.id,
        name : player.name
    };
    //this.handCardsAndCoins();
    //this.announce({what : 'started', turn: this.turn})
  }

  Game.prototype.getPlayer = function() {
    for (var i in this.players){
      if (this.players[i].id === id) return this.players[i];
    }
    return null;
  }

  Game.prototype.dealCards = function() {

  }

  Game.prototype

  module.exports = Game

})();


// rooms[roomName] = {

//             player : function(id) {
//                 for (var i in this.players){
//                     if (this.players[i].id === id) return this.players[i];
//                 }
//                 return null;
//             },
//             announce : function(data, socket) {
//                 if (socket) {
//                     socket.broadcast.to(this.name).emit('announce', data);
//                 } else {
//                     io.sockets.in(this.name).emit('announce',data);
//                 }
//             },
//             start : function() {
//                 this.started = true;
//                 var p = this.players[0];
//                 this.turn = {
//                     id : p.id,
//                     name : p.name
//                 };
//                 this.handCardsAndCoins();
//                 this.announce({what : 'started', turn: this.turn})
//             },
//             handCardsAndCoins : function() {
//                 for (var i in this.players) {
//                     var player = this.players[i];
//                     var card_1 = this.deck.shift();
//                     var card_2 = this.deck.shift();
//                     player.lost = false;
//                     player.coins = 2;
//                     player.cards = [
//                         {
//                             id : "first",
//                             flipped : false,
//                             type : card_1
//                         },
//                         {
//                             id : "second",
//                             flipped : false,
//                             type : card_2
//                         }
//                     ];
//                     player.has = function(card) {
//                         if (!this.cards[0].flipped && this.cards[0].type === card) {
//                             return true;
//                         } else if (!this.cards[1].flipped && this.cards[1].type === card) {
//                             return true;
//                         }
//                         return false;
//                     };
//                     player.flip = function(card) {
//                         var flipped;
//                         if (!this.cards[0].flipped && (this.cards[0].type === card || this.cards[0].id === card)) {
//                             this.cards[0].flipped = true;
//                             flipped = [ this.cards[0] ];
//                         } else if (!this.cards[1].flipped && (this.cards[1].type === card || this.cards[1].id === card)) {
//                             this.cards[1].flipped = true;
//                             flipped = [ this.cards[1] ];
//                         } else if (card === 'both'){
//                             this.cards[0].flipped = true;
//                             this.cards[1].flipped = true;
//                             flipped = this.cards;
//                         }

//                         this.lost = this.cards[0].flipped && this.cards[1].flipped;
//                         return flipped;
//                     };
//                     var s = sockets[player.id];
//                     s.emit('hand-cards', player.cards);
//                 }
//             }
//         };