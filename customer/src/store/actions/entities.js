export const incrementItem = (itemName, n) => ({ // eslint-disable-line import/prefer-default-export
  type: 'INCREMENT_ITEM',
  itemName,
  n,
});

export const updateBar = bar => ({
  type: 'UPDATE_BAR',
  ...bar,
});
