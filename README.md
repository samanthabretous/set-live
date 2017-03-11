## Multi player Card Game (SET)

**Set is a web application that allows multiple users race to find a SET. With no turns and no luck, SET is challenging, fast and fun! SET can be played alone or with as many players as you can fit around the table!**

**How To Play:**
The object of the game is to identify a Set of 3 cards from the 12 cards displayed on the screen. 

Each card has four features which can vary as follows: 

A Set consists of 3 cards in which each of the cards' features, look at one-by-one, are the same on each card, or, are different on each card. All of the features must satisfy the rule. In other words: shape must be either the same on all 3 cards, or different on all three cards; color must be either the same on all 3 cards, or different on all three cards, etc. 

The play continues until the deck is depleted.

1. Log In or Sign Up
2. Join a game room and invite your friends to join
3. Start the game and compete to make a Set

**Technologies and frameworks:**

* Back end:
  * [Sequelize](http://docs.sequelizejs.com/en/v3/) - ORM to connect the PostgreSQL database
  * [Socket.io](http://socket.io) - to handle all of the game actions
  * [socketio-jwt](https://github.com/auth0/socketio-jwt) - provide authorization to web sockets
  * Express framework - for signing and logging into user's account
  * [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) - for password authorization
  * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - to securely transfer user information between the front and back end

* Front end:
  * [React](https://facebook.github.io/react/)
  * [Redux](http://redux.js.org/)
  * [React Router](https://reacttraining.com/react-router/)
  * [Sass](http://sass-lang.com/)
  * [Socket.io client](https://github.com/socketio/socket.io-client)


##License:
All content of this project is licensed for use under the MIT license.
All registered trademarks belong to their respective owners.