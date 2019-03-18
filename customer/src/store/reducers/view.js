import { combineReducers } from 'redux';

const initialState = 'MENU';

const page = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE': {
      return action.page;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  page,
});
