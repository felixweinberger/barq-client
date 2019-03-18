import React from 'react';
import { connect } from 'react-redux';

import { incrementItem } from '../store/actions/orders';

import IconButton from './iconButton';
import Price from './price';
import Counter from './counter';

import '../styles/menuItem.css';

const MenuItem = (props) => {
  const { menuItem: { name, price } } = props;
  const number = props.orders[props.menuItem._id] || 0;
  return (
    <div className="menu-item">
      <span className="menu-item__name">{name}</span>
      <IconButton iconUrl="/info.png" />
      <Price price={price} style={{ margin: '0 0.5rem' }} />
      <Counter
        count={number}
        onAdd={() => props.incrementItem(props.menuItem._id, 1)}
        onMinus={() => props.incrementItem(props.menuItem._id, -1)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  orders: state.orders,
});

const mapDispatchToProps = dispatch => ({
  incrementItem: (itemId, n) => dispatch(incrementItem(itemId, n)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(MenuItem);
