(function() {
  let Player = function(config){
    this.id = config.id;
    this.name = config.name;
    this.cards = null;
    this.lost = false;
    this.room = null
  }

  Player.prototype.addRoom = function (roomName) {
    return this.room = roomName;
  }

  module.exports = Player;

})();