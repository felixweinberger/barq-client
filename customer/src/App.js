import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  updateBar,
  updateOrder,
  updateStatus,
  clearOrder,
} from './store/actions/entities';
import { updatePage as updatePageAction } from './store/actions/view';

import Logo from './ui/logo';
import Menu from './containers/menu';
import Checkout from './containers/checkout';
import Pay from './containers/pay';
import Queue from './containers/queue';
import Closed from './containers/closed';

import './App.css';

class App extends Component { // eslint-disable-line
  switch = {
    MENU: () => {
      const {
        updatePage, bar, order, totals: { pretaxTotal },
      } = this.props;
      return (
        <Menu
          updatePage={updatePage}
          bar={bar}
          order={order}
          total={pretaxTotal}
        />
      );
    },
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
        updatePage={this.props.updatePage}
        orderId={this.props.orderId}
        orderStatus={this.props.orderStatus}
        updateStatus={this.props.updateStatus}
        clearOrder={this.props.clearOrder}
      />
    ),
    CLOSED: () => (
      <Closed />
    ),
  }

  componentDidMount = () => {
    axios.get(`${window.location.pathname}/menu`)
      .then((res) => {
        if (res.data.menu) this.props.updateBar(res.data);
        console.log(res.data);
        if (!res.data.menu || res.data.open === 'false') this.props.updatePage('CLOSED');
        const cachedOrder = window.localStorage.getItem('order');
        if (cachedOrder) this.props.updateOrder(JSON.parse(cachedOrder));
        if (this.props.orderId) this.props.updatePage('QUEUE');
        else if (this.props.order.length > 0) this.props.updatePage('CHECKOUT');
      });
  }

  render() {
    return (
      <div className="App">
        <Logo logoPath="/logo.jpg" barName={this.props.bar.name} />
        { this.switch[this.props.page]() }
      </div>
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
  updatePage: page => dispatch(updatePageAction(page)),
  updateOrder: order => dispatch(updateOrder(order)),
  updateStatus: status => dispatch(updateStatus(status)),
  clearOrder: () => dispatch(clearOrder()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
