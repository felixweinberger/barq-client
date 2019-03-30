export const updateQueue = (queue) => ({
  type:'UPDATE_QUEUE',
  queue
});

export const addOrder = (order) => ({
  type:'ADD_ORDER',
  order
});

export const updateStatus = (status, order) => ({
  type:'UPDATE_STATUS',
  status, order
});

export const updatePage = (page) => ({
  type:'UPDATE_PAGE',
  page
});

export const setOpen = (isOpen) => ({
  type: 'SET_OPEN',
  isOpen
})