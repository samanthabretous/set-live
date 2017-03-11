(() => {
  class Player {
    constructor(config) {
      this.id = config.id;
      this.name = config.name;
      this.cards = null;
      this.lost = false;

      // property is needed to help with disconnection
      this.room = null;
    }
    addRoom(roomName) {
      this.room = roomName;
      return this.room;
    }
  }

  module.exports = Player;
})();
