import { CLICKED_CARDS } from './types';
import store from '../store'

export function addClickedCard(payload) {
  return {
    type: CLICKED_CARDS,
    payload
  }
}
