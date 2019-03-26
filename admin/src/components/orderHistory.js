import React from 'react';

const OrderHistory = (props) => {
  const { history } = props;
  return (
    <div className="orderHistory">
      {JSON.stringify(history)}
    </div>
  );
};

export default OrderHistory;
