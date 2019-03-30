import { combineReducers } from 'redux';

import { flatten, keyBy } from 'lodash';

const initialState = {
  catalog: {},
  menu: null,
  vatRate: null,
  name: null,
};

const menu = (state = initialState.menu, action) => {
  switch (action.type) {
    case 'UPDATE_BAR': {
      return action.menu;
    }
    default: {
      return state;
    }
  }
};

const catalog = (state = initialState.catalog, action) => {
  switch (action.type) {
    case 'UPDATE_BAR': {
      return keyBy(flatten(action.menu.map(category => category.items)), 'name');
    }
    default: {
      return state;
    }
  }
};

const name = (state = initialState.name, action) => {
  switch (action.type) {
    case 'UPDATE_BAR': {
      return action.name;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  menu, catalog, name,
});
