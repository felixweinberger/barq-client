import normalizeBar from '../normalizers/bar';

const api = () => next => (action) => {
  if (action.type === 'UPDATE_BAR') {
    next({
      type: action.type,
      ...normalizeBar(action.bar).entities,
    });
  }
};

export default api;
