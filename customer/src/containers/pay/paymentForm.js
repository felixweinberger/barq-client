import React, { Component } from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements';
import axios from 'axios';

import Loader from '../../ui/loader';
import Footer from '../../ui/footer';

class PaymentForm extends Component {
  readyCounter = 0;

  buttonStates = {
    loading: {
      title: 'Loading',
      clickable: false,
      type: 'neutral',
    },
    paying: {
      title: 'Paying...',
      clickable: false,
      type: 'neutral',
    },
    success: {
      title: 'Track order!',
      clickable: true,
      type: 'success',
    },
    failed: {
      title: 'Try Again',
      clickable: true,
      type: 'danger',
    },
    ready: {
      title: 'Submit',
      clickable: true,
      type: 'success',
    },
  }

  createOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: 'white',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#EA0E48',
      },
    },
  };

  state = {
    paid: false,
    button: this.buttonStates.loading,
  };

  getStripeToken = async () => {
    const { stripe } = this.props;
    const { token } = await stripe.createToken({ name: 'test' });
    if (!token) throw new Error('Failed');
    return token;
  }

  createOrderData = async (total, order) => {
    const token = await this.getStripeToken();
    return {
      stripe: {
        amount: Number((total * 100).toFixed(0)),
        currency: 'eur',
        description: 'Drinks order',
        source: token.id,
        statement_descriptor: 'Drinks order',
      },
      order: {
        items: order,
      },
    };
  }

  handleSubmit = async (e) => {
    const { button: { clickable } } = this.state;
    const {
      total, order, updateOrder, updatePage, isMenuOpen,
    } = this.props;

    e.preventDefault();
    if (!clickable) return;

    try {
      const { paying, success } = this.buttonStates;
      const { barId } = this.props;
      this.setState({ button: paying });
      const isOpen = await isMenuOpen();
      if (!isOpen) return updatePage('CLOSED');
      const orderData = await this.createOrderData(total, order);
      const { data } = await axios.post(`/${barId}/pay`, orderData);
      if (data.status === 'paid') {
        window.localStorage.setItem(barId, JSON.stringify(data));
        updateOrder(data);
        this.setState({
          paid: true,
          button: success,
        });
        updatePage('QUEUE');
      }
    } catch (err) {
      const { failed } = this.buttonStates;
      this.setState({ button: failed });
    }
  }

  handleBlur = () => null;

  handleChange = () => null;

  handleFocus = () => null;

  handleReady = () => {
    this.readyCounter += 1;
    if (this.readyCounter === 3) {
      this.setState({ button: this.buttonStates.ready });
    }
  };

  render() {
    const {
      button: { title, type, clickable },
      paid,
    } = this.state;
    const { updatePage } = this.props;
    return (
      <>
        {
          title === 'Loading'
          && <Loader />
        }
        <form
          className={`pay__form${title === 'Loading' ? '--invisible' : ''}`}
          onSubmit={this.handleSubmit}
        >
          <div className="pay__stripe" />
          <div className="pay__info">
            <div className="pay__top">
              <label className="pay__number">
                Card number
                <CardNumberElement
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onReady={this.handleReady}
                  {...this.createOptions}
                />
              </label>
            </div>
            <div className="pay__bottom">
              <label className="pay__cvc">
                CVC
                <CardCVCElement
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onReady={this.handleReady}
                  {...this.createOptions}
                />
              </label>
              <label className="pay__expiry">
                Expiry date
                <CardExpiryElement
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onReady={this.handleReady}
                  {...this.createOptions}
                />
              </label>
            </div>
          </div>
          <Footer
            primaryButtonName={title}
            primaryButtonType={type}
            primaryButtonClickable={clickable}
            secondaryButtonName={paid ? null : 'Back'}
            onSecondaryClick={paid ? null : () => updatePage('CHECKOUT')}
          />
        </form>
      </>
    );
  }
}

export default injectStripe(PaymentForm);
