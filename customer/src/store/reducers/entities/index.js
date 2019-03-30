import { combineReducers } from 'redux';
import bar from './bar';
import order from './order';

export default combineReducers({
  order, bar,
});
