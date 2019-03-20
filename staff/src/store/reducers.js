import { combineReducers } from 'redux';

const initialState = {
  queue: [],
  history: [],
}

function queue (state = initialState.queue, action) {
  switch (action.type) {
    case 'UPDATE_QUEUE': {
      return action.queue.filter(order => order.status !== 'delivered');
    }
    case 'ADD_ORDER': {
      return state.concat(action.order);
    }
    case 'UPDATE_STATUS' : {
      console.log(action.status);
      if (action.status === 'delivered') return state.filter(order => order.orderId !== action.order.orderId);
      return state.map(order => {
        if(order.orderId !== action.order.orderId) return order;
        else return Object.assign({}, order, {status: action.status})
      })
    }
    default: {
      return state;
    }
  }
}

function history (state = initialState.history, action) {
  switch (action.type) {
    case 'UPDATE_QUEUE': {
      return action.queue.filter(order => order.status === 'delivered');
    }
    case 'UPDATE_STATUS' : {
      if (action.status === 'delivered') return state.concat(action.order);
      return state;
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  queue, history
});