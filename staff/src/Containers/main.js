import React, { Component } from 'react';
import axios from 'axios';
import PopUp from '../ui/popup.js';
import OrderListItem from '../ui/orderListItem.js';


class Main extends Component {
  url = `/staff${window.location.pathname}/queue`;

  componentDidMount() {
    this.listAllOrders();
  }

  listAllOrders = () => {
    axios.get(this.url, {headers: {"Content-type": "application/json"}})
     .then(res => {
       const { queue } = res.data;
       this.props.updateQueue(queue)
     })
  }

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
