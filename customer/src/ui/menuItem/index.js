import React from 'react';
import { connect } from 'react-redux';

import { incrementItem as actionIncrementItem } from '../../store/actions/entities';

import Text from '../text';
import Price from '../price';
import Counter from './counter';
import PopupInfo from '../popupInfo';

import '../../styles/menuItem.css';
import '../../styles/popupInfo.css';

const MenuItem = ({
  item: {
    currency, name, price,
  },
  order,
  incrementItem,
  editable = true,
  showPrice = true,
}) => {
  const number = order[name] || 0;
  return (
    <div className="menu-item">
      <div className="menu-item__name">
        <Text style={{ wordBreak: 'break-word' }} content={name} />
        { showPrice && <Price style={{ flexBasis: '100%' }} price={price} currency={currency} /> }
      </div>
      <div className="menu__info">
        <PopupInfo />
      </div>
      {
        editable
          ? (
            <Counter
              count={number}
              onAdd={() => incrementItem(name, 1)}
              onMinus={() => incrementItem(name, -1)}
            />
          )
          : <Text style={{ marginLeft: '1rem' }} content={`x ${number}`} />
      }
    </div>
  );
};

const mapStateToProps = state => ({
  order: state.entities.order.items,
});

const mapDispatchToProps = dispatch => ({
  incrementItem: (itemId, n) => dispatch(actionIncrementItem(itemId, n)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(MenuItem);
