export const incrementItem = (itemId, n) => ({ // eslint-disable-line import/prefer-default-export
  type: 'INCREMENT_ITEM',
  itemId,
  n,
});

export const updateMenu = menu => ({
  type: 'UPDATE_MENU',
  menu,
});
