import React from 'react';

import '../styles/price.css';

const Price = ({ price, style }) => (
  <span className="price" style={{ ...style }}>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)}</span>
);

export default Price;
