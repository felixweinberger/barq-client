import React from 'react';
import { Elements } from 'react-stripe-elements';

import InjectedPaymentForm from './paymentForm';

import '../../styles/containers/pay.css';

const Pay = props => (
  <div className="pay">
    <Elements>
      <InjectedPaymentForm
        {...props}
      />
    </Elements>
  </div>
);

export default Pay;
