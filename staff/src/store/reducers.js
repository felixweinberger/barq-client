import { combineReducers } from 'redux';

const initialState = {
  queue: [],
  history: [],
  page: 'MAIN',
  isOpen: true,
}

function queue (state = initialState.queue, action) {
  switch (action.type) {
    case 'UPDATE_QUEUE': {
      return action.queue.filter(order => order.status !== 'delivered');
    }
    case 'ADD_ORDER': {
      if (state.find(order => order.orderId === Number(action.order.orderId))) return state;
      return state.concat(action.order);
    }
    case 'UPDATE_STATUS' : {
      if (action.status === 'delivered') return state.filter(order => order.orderId !== action.order.orderId);
      
      const index = state.findIndex(order => order.orderId === action.order.orderId);
      if (action.status !== 'delivered' && index === -1) return state.concat(action.order);
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
      const index = state.findIndex(order => order.orderId === action.order.orderId);
      if (action.status === 'delivered' && index === -1) {
        return state.concat(Object.assign({}, action.order, {status: action.status}));
      } else if (action.status !== 'delivered' && index !== -1) {
        return state.filter((order, i) => i !== index);
      }
      return state;
    }
    default: {
      return state;
    }
  }
}

function page (state = initialState.page, action) {
  switch (action.type) {
    case 'UPDATE_PAGE': {
      return action.page;
    }
    default: {
      return state;
    }
  }
}

function isOpen (state = initialState.isOpen, action) {
  switch (action.type) {
    case 'SET_OPEN': {
      return action.isOpen;
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  queue, history, page, isOpen
});