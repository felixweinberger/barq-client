import { combineReducers } from 'redux';
import entities from './entities';
import view from './view';

export default combineReducers({
  entities, view,
});
