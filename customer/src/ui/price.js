import React from 'react';

import '../styles/price.css';

const Price = ({ price, style }) => (
  <span className="price" style={{ ...style }}>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price)}</span>
);

export default Price;
