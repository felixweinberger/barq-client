import React from 'react';

import IconButton from '../iconButton';
import minus from '../../assets/minus.png';
import plus from '../../assets/plus.png';

import '../../styles/counter.css';

const Counter = ({ count, onMinus, onAdd }) => (
  <div className="counter">
    <IconButton iconUrl={minus} onClick={onMinus} />
    <span className="counter__count">{count}</span>
    <IconButton iconUrl={plus} onClick={onAdd} />
  </div>
);

export default Counter;
