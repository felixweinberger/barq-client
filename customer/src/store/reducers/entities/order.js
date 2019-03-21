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
      return {
        ...state,
        ...mapValues(keyBy(action.items, 'name'), o => o.quantity),
      };
    }
    case 'CLEAR_ORDER': {
      return initialState.items;
    }
    default: {
      return state;
    }
  }
};

const tipRate = (state = initialState.tipRate, action) => {
  switch (action.type) {
    case 'UPDATE_TIP_RATE': {
      return action.tipRate || state;
    }
    case 'CLEAR_ORDER': {
      return initialState.tipRate;
    }
    default: {
      return state;
    }
  }
};

const orderId = (state = initialState.orderId, action) => {
  switch (action.type) {
    case 'UPDATE_ORDER': {
      return action.orderId || state;
    }
    case 'CLEAR_ORDER': {
      return initialState.orderId;
    }
    default: {
      return state;
    }
  }
};

const status = (state = initialState.status, action) => {
  switch (action.type) {
    case 'UPDATE_ORDER': {
      return action.status || state;
    }
    case 'UPDATE_STATUS': {
      return action.status;
    }
    case 'CLEAR_ORDER': {
      return initialState.status;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  items, tipRate, orderId, status,
});
