import React, { forwardRef } from 'react';
import { Elements } from 'react-stripe-elements';

import withPose from '../withPose';

import SecondaryHead from '../../ui/primaryHead';
import InjectedPaymentForm from './paymentForm';

import '../../styles/containers/pay.css';

const Pay = forwardRef((props, ref) => (
  <div ref={ref} className="pay">
    <SecondaryHead title="Payment" />
    <Elements>
      <InjectedPaymentForm
        {...props}
      />
    </Elements>
  </div>
));

export default withPose(Pay);
