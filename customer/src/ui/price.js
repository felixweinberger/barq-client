import React from 'react';

import '../styles/price.css';

const Price = ({price}) => {
  return (
    <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format({price})}</span>
  );
}

export default Price;