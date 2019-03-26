import React from 'react';

const OrderHistory = ({ history, refreshHistory }) => (
  <div className="orderHistory">
    <input type="submit" value="Refresh history" onClick={refreshHistory} />
    <table>
      <tbody>
        <tr>
          <th id="thOrder">#</th>
          <th id="thDate">Date</th>
          <th id="thItems">Items</th>
          <th id="thTotal">Total</th>
        </tr>
        {history.length > 0
          ? history.map((order, i) => {
            const total = order.items.reduce((acc, el) => acc + el.amount, 0);
            return (
              <tr key={order.orderId} className={`tr${i % 2}`}>
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
      </tbody>
    </table>
  </div>
);


export default OrderHistory;
