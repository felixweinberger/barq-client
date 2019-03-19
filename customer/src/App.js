import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateBar, updateOrder } from './store/actions/entities';
import { updatePage } from './store/actions/view';

import Menu from './containers/menu';
import Checkout from './containers/checkout';
import Pay from './containers/pay';
import Queue from './containers/queue';

import './App.css';

class App extends Component { // eslint-disable-line
  switch = {
    MENU: () => <Menu updatePage={this.props.updatePage} bar={this.props.bar} />,
    CHECKOUT: () => (
      <Checkout
        updatePage={this.props.updatePage}
        totals={this.props.totals}
        order={this.props.order}
      />
    ),
    PAY: () => (
      <Pay
        updatePage={this.props.updatePage}
        updateOrder={this.props.updateOrder}
        order={this.props.order}
        totals={this.props.totals}
      />
    ),
    QUEUE: () => (
      <Queue
        order={this.props.order}
        orderId={this.props.orderId}
        orderStatus={this.props.orderStatus}
      />
    ),
  }

  componentDidMount = () => {
    axios.get('https://private-anon-cdc859ad92-barq.apiary-mock.com/a791xu/menu')
      .then((res) => {
        this.props.updateBar(res.data);
      });
  }

  render() {
    return (
      this.switch[this.props.page]()
    );
  }
}

const getOrderDetails = (order, catalog) => (
  Object.entries(order).map(([itemId, quantity]) => ({ ...catalog[itemId], quantity }))
);

const getOrderTotal = (order, catalog, vatRate, tipRate) => {
  const orderDetails = getOrderDetails(order, catalog);
  const pretaxTotal = orderDetails.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  const vat = pretaxTotal * vatRate;
  const pretipTotal = pretaxTotal + vat;
  const tip = pretipTotal * tipRate;
  const total = pretipTotal + tip;
  return {
    pretaxTotal,
    vat,
    tip,
    total,
  };
};

const mapStateToProps = state => ({
  bar: state.entities.bar,
  page: state.view.page,
  orderId: state.entities.order.orderId,
  orderStatus: state.entities.order.status,
  order: getOrderDetails(state.entities.order.items, state.entities.bar.catalog),
  totals: getOrderTotal(
    state.entities.order.items,
    state.entities.bar.catalog,
    state.entities.bar.vatRate,
    state.entities.order.tipRate,
  ),
});

const mapDispatchToProps = dispatch => ({
  updateBar: bar => dispatch(updateBar(bar)),
  updatePage: page => dispatch(updatePage(page)),
  updateOrder: order => dispatch(updateOrder(order)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
