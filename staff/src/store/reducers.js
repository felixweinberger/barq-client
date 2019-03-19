import { combineReducers } from 'redux';

const initialState = [];

function queue (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_QUEUE': {
      return action.queue;
    }
    case 'ADD_ORDER': {
      return state.concat(action.order);
    }
    case 'UPDATE_STATUS' : {
      console.log(action)
      return state.map(order => {
        if(order.orderId !== action.orderId) return order;
        else return Object.assign({}, order, {status: action.status})
      })
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({queue});