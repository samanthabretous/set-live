/** ===========================
  TYPES
==============================*/
export const GO_TO_GAME = 'go_to_game';
/** ===========================
  ACTIONS
==============================*/

export const goToGame = gameInfo => ({
  type: GO_TO_GAME,
  gameInfo,
});

/** ===========================
  REDUCER
==============================*/
