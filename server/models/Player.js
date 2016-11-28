(function() {
  let Player = function(config){
    this.id = config.id;
    this.name = config.name;
    this.cards = null;
    this.lost = false;
    
  }

  module.exports = Player

})();