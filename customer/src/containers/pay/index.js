import React from 'react';
import { Elements } from 'react-stripe-elements';

import InjectedPaymentForm from './paymentForm';

import '../../styles/containers/pay.css';

const Pay = ({
  order,
  updatePage,
  updateOrder,
  totals,
}) => (
  <div className="pay">
    <Elements>
      <InjectedPaymentForm
        order={order}
        totals={totals}
        updatePage={updatePage}
        updateOrder={updateOrder}
      />
    </Elements>
  </div>
);

export default Pay;
