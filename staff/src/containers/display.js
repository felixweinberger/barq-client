import React from 'react';
import "../styles/display.css";

const Display = ({ queue, history }) => {
  const lastItem = history[history.length - 1] ? `#${history[history.length - 1].orderId}` : '';
  return (<div className="display">
    <div className="pickup">
      <h1>Ready for pickup</h1>
      {
        queue
        .filter(order => order.status === 'ready for pickup')
        .map(order => <h2>#{order.orderId}</h2>)
      }
    </div>
    <div className="right-side">
      <div className="last-delivered">
        <h1>Last delivered</h1>
        <h2>{lastItem}</h2>
      </div>
      <div className="upcoming">
        <h1>Upcoming</h1>
        {
          queue
          .filter(order => order.status === 'in preparation')
          .map(order => <h2>#{order.orderId}</h2>)
        }
      </div>
    </div>
  </div>);
}

export default Display;
