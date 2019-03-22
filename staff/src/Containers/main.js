import React, { Component } from 'react';
import OrderListItem from '../ui/orderListItem.js';

import '../styles/main.css';


class Main extends Component {
  emitStatusUpdate = (orderId, nextStatus) => {
    this.props.socket.emit('STATUS_UPDATE', orderId, nextStatus);
  }
  
  render() {
    console.log(this.props);
    return (
      <div className="main">
      {
        !this.props.queue
        ? <div>loading...</div>
        : this.props.queue.map(list => {
            return (
              <OrderListItem
                key={list.orderId}
                orderId={list.orderId}
                items={list.items}
                status={list.status}
                emitStatusUpdate={nextStatus => this.emitStatusUpdate(list.orderId, nextStatus)}
              />
            )
          })
      }
      </div>  
    );
  }
}

export default Main;
