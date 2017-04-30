import { CLICKED_CARDS, UPDATE_CARDS, ADD_MEMBER, CONNECTION_STATUS, SET_ROOM_NAME, SET_PLAYER_INFO, ADD_PLAYER,  RELOAD_GAME, UPDATE_GAME, GAME_STARTED, LEFT_PLAYER, GO_TO_GAME  } from './game';
import { USERNAME, RESET_LOGIN } from './login';

const INTIAL_STATE = {
  game: null,
  playerInfo: null,
  playerHasLeft: null,
  board: [],
  clickedCards: [],
  status: 'disconnected',
  playerSet: null,
  username: null,
};

export default function (state = INTIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_CARDS:
    case ADD_MEMBER:
    case CONNECTION_STATUS:
    case SET_ROOM_NAME:
    case SET_PLAYER_INFO:
    case USERNAME:
      let key = Object.keys(action)[1];
      return Object.assign({}, state, { [key]: action[key] });
    case CLICKED_CARDS:
      return Object.assign({}, state, { clickedCards: action.payload });
    case GO_TO_GAME:
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
    case RELOAD_GAME:
      return Object.assign({}, state, {
        deck: action.deck,
        started: action.started,
        players: action.players,
        gameId: action.game.id,
        board: action.board,
      });
    case UPDATE_GAME:
      return Object.assign({}, state, {
        board: action.board,
        deck: action.deck,
        playerSet: action.playerSet,
      });
    // action comes from Logout.jsx
    case RESET_LOGIN:
      return Object.assign({}, state, INTIAL_STATE);
    default:
      return state;
  }
}
