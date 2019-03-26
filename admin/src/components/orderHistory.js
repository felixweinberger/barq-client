import React from 'react';

const OrderHistory = (props) => {
  const { history, onRefreshHistory } = props;
  return (
    <div className="orderHistory">
      <input type="submit" value="Refresh history" onClick={onRefreshHistory} />
      {history.length > 0
        ? history.map(order => (
          <div key={order.orderId}>
            Order #:
            {order.orderId}
            Date:
            {order.timestamp}
            Items:
            {order.items.map(orderItem => (
              <div key={orderItem._id}>
                {orderItem.name}
                x
                {orderItem.quantity}
                $
                {orderItem.price}
              </div>
            ))}
          </div>
        ))
        : null}
    </div>
  );
};

export default OrderHistory;
