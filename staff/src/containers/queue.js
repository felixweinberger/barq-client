import React, { Component } from 'react';

import OrderListItem from '../ui/orderListItem.js';

import '../styles/queue.css';

class Queue extends Component {
  emitStatusUpdate = (orderId, nextStatus) => {
    this.props.socket.emit('STATUS_UPDATE', orderId, nextStatus);
  }
  
  render() {
    return (
      <div className="queue">
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
                specialWishes={list.specialWishes}
                queue={this.props.queue}
                emitStatusUpdate={nextStatus => this.emitStatusUpdate(list.orderId, nextStatus)}
              />
            )
          })
      }
      </div>  
    );
  }
}

export default Queue;
