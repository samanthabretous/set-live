(function() {
  let Player = function(config){
    this.id = config.id;
    this.name = config.name;
    this.cards = null;
    this.lost = false;

    //property is needed to help with disconnection
    this.room = null
  }

  Player.prototype.addRoom = function (roomName) {
    return this.room = roomName;
  }

  module.exports = Player;

})();