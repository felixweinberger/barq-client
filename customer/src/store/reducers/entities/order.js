import { combineReducers } from 'redux';
import { keyBy, mapValues } from 'lodash'; // eslint-disable-line

const initialState = {
  items: {},
  tipRate: 0.05,
  orderId: null,
  status: 'unpaid',
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
    case 'UPDATE_ORDER': {
      return state;
      // return mapValues(keyBy(action.items, 'name'), o => o.quantity);
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

const orderId = (state = initialState.orderId, action) => {
  switch (action.type) {
    case 'UPDATE_ORDER': {
      return action.orderId;
    }
    default: {
      return state;
    }
  }
};

const status = (state = initialState.status, action) => {
  switch (action.type) {
    case 'UPDATE_ORDER': {
      return action.status;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  items, tipRate, orderId, status,
});
