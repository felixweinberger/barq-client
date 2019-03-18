import { combineReducers } from 'redux';

const initialState = {
  order: {},
  menu: null,
};

const order = (state = initialState, action) => {
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

const menu = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MENU': {
      return action.menu;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  order, menu,
});
