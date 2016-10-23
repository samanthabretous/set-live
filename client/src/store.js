import { createStore } from 'redux';
import reducer from './reducers/MainReducer'

const store = createStore(reducer)

export default store