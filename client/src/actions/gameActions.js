import { CLICKED_CARDS, MODAL_STATUS } from './types';

export const addClickedCard = payload => ({
  type: CLICKED_CARDS,
  payload,
});

export const inviteModalAction = modalStatus => ({
  type: MODAL_STATUS, 
  modalStatus,
});
