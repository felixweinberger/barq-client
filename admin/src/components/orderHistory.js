import React from 'react';

const OrderHistory = ({ history, refreshHistory }) => (
  <div className="orderHistory">
    <input className="clickerSmall" id="refreshHistory" type="submit" value="Refresh history" onClick={refreshHistory} />
    <table className="orderHistory__table">
      <tbody>
        <tr>
          <th id="thOrder">#</th>
          <th id="thDate">Date</th>
          <th id="thTime">Time</th>
          <th id="thItems">Items</th>
          <th id="thTotal">Total</th>
        </tr>
        {history.length > 0
          ? history.map((order, i) => {
            const timestamp = new Date(order.timestamp);
            const date = timestamp.toLocaleDateString('en-GB');
            const time = timestamp.toLocaleTimeString('en-GB');

            return (
              <tr key={order.orderId} className={`tr${i % 2}`}>
                <td>{order.orderId}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td className="orderHistory__itemrow">
                  {order.items.map(orderItem => (
                    <div key={orderItem.name}>
                      {`${orderItem.quantity}x ${orderItem.name} (${orderItem.quantity}x €${orderItem.price})`}
                    </div>
                  ))}
                </td>
                <td>{`€ ${order.total.toFixed(2)}`}</td>
              </tr>
            );
          }).reverse()
          : null}
      </tbody>
    </table>
  </div>
);


export default OrderHistory;
