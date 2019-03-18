export const incrementItem = (itemId, n) => ({ // eslint-disable-line import/prefer-default-export
  type: 'INCREMENT_ITEM',
  itemId,
  n,
});
