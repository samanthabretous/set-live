/** ===========================
  TYPES
==============================*/
const CLICKED_CARDS = 'clicked_cards';
const MODAL_STATUS = 'modal-status'

/** ===========================
  ACTIONS
==============================*/

export const addClickedCard = payload => ({
  type: CLICKED_CARDS,
  payload,
});

export const inviteModalAction = modalStatus => ({
  type: MODAL_STATUS,
  modalStatus,
});
