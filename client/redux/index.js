import { CLICKED_CARDS, UPDATE_CARDS, CONNECTION_STATUS, SET_ROOM_NAME, SET_PLAYER_INFO, ADD_PLAYER, GAME_STARTED, GO_TO_GAME, CHANGE_BOARD_LENGTH } from './game';
import { USERNAME, RESET_LOGIN } from './login';

const INTIAL_STATE = {
  game: null,
  playerInfo: null,
  playerHasLeft: null,
  board: [],
  clickedCards: [],
  status: 'disconnected',
  username: null,
};

export default function (state = INTIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_BOARD_LENGTH:
      const cardsToAdd = action.boardLength === 15 ? 3 : 0;
      return Object.assign({}, state, {
        board: [...state.board, ...state.game.cards.splice(12, cardsToAdd)],
      });
    case UPDATE_CARDS:
      return Object.assign({}, state, {
        board: action.cards.splice(0, 12),
        game: {
          ...state.game,
          cards: action.cards,
        },
      });
    case CONNECTION_STATUS:
    case SET_ROOM_NAME:
    case SET_PLAYER_INFO:
    case USERNAME:
      const key = Object.keys(action)[1];
      return Object.assign({}, state, { [key]: action[key] });
    case CLICKED_CARDS:
      return Object.assign({}, state, { clickedCards: action.payload });
    case GO_TO_GAME:
    console.log(action.gameInfo);
      return Object.assign({}, state, {
        game: action.gameInfo.game,
        playerInfo: action.gameInfo.playerInfo,
        board: action.gameInfo.board,
      });
    case GAME_STARTED:
      return Object.assign({}, state, {
        game: {
          ...state.game,
          started: true,
        },
      });
    case ADD_PLAYER:
      return Object.assign({}, state, { players: [...state.players, action.player] });
    // action comes from Logout.jsx
    case RESET_LOGIN:
      return Object.assign({}, state, INTIAL_STATE);
    default:
      return state;
  }
}
