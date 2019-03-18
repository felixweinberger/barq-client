import React from 'react';

import IconButton from '../iconButton';

import '../../styles/counter.css';

const Counter = ({ count, onMinus, onAdd }) => (
  <div className="counter">
    <IconButton iconUrl="/minus.png" onClick={onMinus} />
    <span className="counter__count">{count}</span>
    <IconButton iconUrl="/plus.png" onClick={onAdd} />
  </div>
);

export default Counter;
