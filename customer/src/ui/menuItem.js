import React from 'react';
import { connect } from 'react-redux';

import { incrementItem as actionIncrementItem } from '../store/actions/entities';

import Text from './text';
import IconButton from './iconButton';
import Price from './price';
import Counter from './counter';

import '../styles/menuItem.css';

const MenuItem = ({
  item: {
    _id, currency, name, price,
  },
  order,
  incrementItem,
}) => {
  const number = order[_id] || 0;
  return (
    <div className="menu-item">
      <div className="menu-item__name">
        <Text content={name} />
        <Price price={price} currency={currency} />
        <IconButton iconUrl="/info.png" />
      </div>
      <Counter
        count={number}
        onAdd={() => incrementItem(_id, 1)}
        onMinus={() => incrementItem(_id, -1)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  order: state.entities.order,
});

const mapDispatchToProps = dispatch => ({
  incrementItem: (itemId, n) => dispatch(actionIncrementItem(itemId, n)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(MenuItem);
