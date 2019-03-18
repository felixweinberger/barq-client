import React, { Component } from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
} from 'react-stripe-elements';
import axios from 'axios';

import Loader from '../../ui/loader'; // eslint-disable-line
import Footer from '../../ui/footer';

class PaymentForm extends Component {
  readyCounter = 0;

  state = {
    loading: true,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.props.stripe);
    try {
      const { token } = await this.props.stripe.createToken({ name: 'test' });
      if (!token) throw new Error('Failed');
      console.log('received stripe token', token);
      const orderData = {
        stripe: {
          amount: this.props.totals.total,
          currency: 'eur',
          description: 'Drinks order',
          source: token,
          statement_descriptor: '',
        },
        order: {
          items: this.props.order,
        },
      };
      console.log(orderData);
      const { data } = await axios.post('https://private-anon-cdc859ad92-barq.apiary-mock.com/barId/pay', orderData);
      if (data.status === 'paid') this.props.updatePage('QUEUE');
    } catch (err) {
      console.log(err.message);
    }
  }

  handleBlur = () => null;

  handleChange = () => null;

  handleFocus = () => null;

  handleReady = () => {
    console.log(this.readyCounter);
    this.readyCounter += 1;
    if (this.readyCounter === 4) this.setState({ loading: false });
  };

  createOptions = (fontSize, padding) => ({
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  });

  render() {
    return (
      <form className="pay__form" onSubmit={this.handleSubmit}>
        <label>
          Card number
          <CardNumberElement
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onReady={this.handleReady}
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onReady={this.handleReady}
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onReady={this.handleReady}
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Postal code
          <PostalCodeElement
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onReady={this.handleReady}
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <Footer
          primaryButtonName="Submit"
          secondaryButtonName="Back"
          onSecondaryClick={() => this.props.updatePage('CHECKOUT')}
          loading={this.state.loading}
        />
      </form>
    );
  }
}

export default injectStripe(PaymentForm);
