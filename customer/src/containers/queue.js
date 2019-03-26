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
    const {
      orderId, orderStatus, order, updateStatus, orderSpecialWishes,
    } = this.props;
    this.socket = io(window.location.pathname, {
      query: {
        bar: window.location.pathname,
        orderNumber: orderId,
      },
    });
    this.socket.emit('NEW_ORDER', {
      orderId,
      status: orderStatus,
      items: order,
      specialWishes: orderSpecialWishes,
    });
    this.socket.on('STATUS_UPDATE', (newStatus) => {
      updateStatus(newStatus);
    });
  }

  closeSocket = () => {
    this.socket.removeAllListeners();
    this.socket.close();
  }

  componentWillUnmount = () => this.closeSocket();

  render() {
    const {
      order, orderId, orderStatus, updatePage, clearOrder, isMenuOpen,
    } = this.props;
    return (
      <>
        <div className="queue">
          <SecondaryHead style={{ margin: '0' }} title="Your number" />
          <PrimaryHead style={{ margin: '0', textAlign: 'center' }} title={`#${orderId}`} />
          <div className="queue__bill">
            {
              order.map(item => (
                <MenuItem key={item.name} item={item} editable={false} showPrice={false} />
              ))
            }
          </div>
          <PrimaryHead style={{ marginBottom: '1rem', textAlign: 'center' }} title={orderStatus} />
          <BeerAnimation />
        </div>
        {
          orderStatus === 'delivered'
          && (
            <Footer
              primaryButtonName="Order another round!"
              onPrimaryClick={() => {
                this.closeSocket();
                clearOrder();
                window.localStorage.removeItem('order');
                isMenuOpen()
                  .then(isOpen => (isOpen ? updatePage('MENU') : updatePage('CLOSED')));
              }}
            />
          )
        }
      </>
    );
  }
}

export default Queue;
