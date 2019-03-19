export const updateQueue = (queue) => ({
  type:'UPDATE_QUEUE',
  queue
});

export const addOrder = (order) => ({
  type:'ADD_ORDER',
  order
});

export const updateStatus = (status, orderId) => ({
  type:'UPDATE_STATUS',
  status, orderId
});