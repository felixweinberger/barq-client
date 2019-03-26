import React from 'react';

const OrderHistory = (props) => {
  const { history, refreshHistory } = props;
  return (
    <div className="orderHistory">
      <input type="submit" value="Refresh history" onClick={refreshHistory} />
      <table>
        <tr>
          <th>Order #</th>
          <th>Date</th>
          <th>Items</th>
          <th>Total</th>
        </tr>
        {history.length > 0
          ? history.map((order) => {
            const total = order.items.reduce((acc, el) => acc + el.amount, 0);
            return (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.timestamp}</td>
                <td>ORDER ITEMS</td>
                <td>
                  €
                  {total}
                </td>
              </tr>
            );
          })
          : null}
      </table>
    </div>
  );
};

export default OrderHistory;
