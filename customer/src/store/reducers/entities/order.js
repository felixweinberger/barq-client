import { combineReducers } from 'redux';

const initialState = {
  items: {},
  tipRate: 0.05,
};

const items = (state = initialState.items, action) => {
  switch (action.type) {
    case 'INCREMENT_ITEM': {
      const tempNumber = (state[action.itemName] || 0) + action.n;
      const newNumber = tempNumber < 0 ? 0 : tempNumber;
      return {
        ...state,
        [action.itemName]: newNumber,
      };
    }
    default: {
      return state;
    }
  }
};

const tipRate = (state = initialState.tipRate, action) => {
  switch (action.type) {
    case 'UPDATE_TIP_RATE': {
      return action.tipRate;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  items, tipRate,
});
