import React from 'react';
import { CardElement } from 'react-stripe-elements';

const CardSection = () => (
  <label>
    Card details
    <CardElement style={{ base: { fontSize: '1rem' } }} />
  </label>
);

export default CardSection;
