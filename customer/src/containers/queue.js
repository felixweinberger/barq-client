import React, { Component } from 'react';
import io from 'socket.io-client';

import Footer from '../ui/footer';
import MenuItem from '../ui/menuItem';
import BeerAnimation from '../ui/beerAnimation';
import PrimaryHead from '../ui/primaryHead';
import SecondaryHead from '../ui/secondaryHead';

import '../styles/containers/queue.css';

class Queue extends Component {
  componentDidMount = () => {
    this.socket = io(window.location.pathname, {
      query: {
        bar: window.location.pathname,
        orderNumber: this.props.orderId,
      },
    });
    this.socket.emit('NEW_ORDER', {
      orderId: this.props.orderId,
      status: this.props.orderStatus,
      items: this.props.order,
    });
    this.socket.on('STATUS_UPDATE', (newStatus) => {
      this.props.updateStatus(newStatus);
    });
  }

  componentDidUpdate = () => {
    if (this.props.orderStatus === 'delivered') {
      this.closeSocket();
    }
  }

  closeSocket = () => {
    this.socket.removeAllListeners();
    this.socket.close();
  }

  componentWillUnmount = () => this.closeSocket();

  render() {
    return (
      <>
        <div className="queue">
          <SecondaryHead style={{ margin: '0' }} title="Your number" />
          <PrimaryHead style={{ margin: '0' }} title={`#${this.props.orderId}`} />
          <div className="queue__bill">
            {
              this.props.order.map(item => (
                <MenuItem key={item.name} item={item} editable={false} />
              ))
            }
          </div>
          <PrimaryHead style={{ marginBottom: '1rem' }} title={this.props.orderStatus} />
          <BeerAnimation />
        </div>
        {
          this.props.orderStatus === 'delivered'
          && (
            <Footer
              primaryButtonName="Order another round!"
              onPrimaryClick={() => {
                this.props.clearOrder();
                window.localStorage.removeItem('order');
                this.props.updatePage('MENU');
              }}
            />
          )
        }
      </>
    );
  }
}

export default Queue;
