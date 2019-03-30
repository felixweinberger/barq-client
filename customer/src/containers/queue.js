import React, { useEffect, forwardRef } from 'react';
import io from 'socket.io-client';

import Footer from '../ui/footer';
import MenuItem from '../ui/menuItem';
import BeerAnimation from '../ui/beerAnimation';
import PrimaryHead from '../ui/primaryHead';
import SecondaryHead from '../ui/secondaryHead';

import '../styles/containers/queue.css';

const Queue = forwardRef((props, ref) => {
  const {
    order,
    orderId,
    orderStatus,
    updatePage,
    clearOrder,
    isMenuOpen,
    orderSpecialWishes,
    updateStatus,
    barId,
  } = props;

  let socket;

  const closeSocket = () => {
    socket.removeAllListeners();
    socket.close();
  };

  useEffect(() => {
    socket = io(`/${props.barId}`, {
      query: {
        bar: `/${props.barId}`,
        orderNumber: orderId,
      },
    });
    socket.emit('NEW_ORDER', {
      orderId,
      status: orderStatus,
      items: order,
      specialWishes: orderSpecialWishes,
    });
    socket.on('STATUS_UPDATE', (newStatus) => {
      updateStatus(newStatus);
    });
    return () => {
      closeSocket();
    };
  }, []);

  return (
    <>
      <div ref={ref} className="queue">
        <SecondaryHead style={{ margin: '0' }} title="Your number" />
        <PrimaryHead style={{ margin: '0', textAlign: 'center' }} title={`#${orderId || ''}`} />
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
              clearOrder();
              window.localStorage.removeItem(barId);
              isMenuOpen()
                .then(isOpen => (isOpen ? updatePage('MENU') : updatePage('CLOSED')));
            }}
          />
        )
      }
    </>
  );
});

export default Queue;
