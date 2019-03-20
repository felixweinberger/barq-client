import React, { Component } from 'react';
import PopUp from '../ui/popup.js';
import OrderListItem from '../ui/orderListItem.js';


class Main extends Component {
  emitStatusUpdate = (orderId, nextStatus) => {
    this.props.socket.emit('STATUS_UPDATE', orderId, nextStatus);
  }
  
  render() {
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
      <PopUp/>
      </div>  
    );
  }
}

export default Main;
