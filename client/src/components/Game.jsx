import React from 'react';

// components
import Board from './Board';
import GameMenu from './GameMenu';

class Game extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      // props.inviteModalAction(false)
    }, 5000);
  }
  render() {
    return (
      <div className="gameView">
        <GameMenu {...this.props} />
        {this.props.deck.length > 0 && <Board {...this.props} />}
      </div>
    );
  }
}

export default Game;
