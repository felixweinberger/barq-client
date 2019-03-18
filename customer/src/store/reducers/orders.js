import { combineReducers } from 'redux';

const initialState = {};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_ITEM': {
      const tempNumber = (state[action.itemId] || 0) + action.n;
      const newNumber = tempNumber < 0 ? 0 : tempNumber;
      return {
        ...state,
        [action.itemId]: newNumber,
      };
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  orders,
});
