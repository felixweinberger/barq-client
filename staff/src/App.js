import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { updateQueue, addOrder, updateStatus, updatePage } from './store/actions';

import Main from './Containers/main';
import Display from './Containers/display';
import QrCode from './Containers/qrCode';
import PopUp from './ui/popup.js';

class App extends Component {
  url = `/staff${window.location.pathname}/queue`;

  switch = {
    MAIN: () => (
      <Main
        socket={this.socket}
        queue={this.props.queue}  
      />
    ),
    HISTORY: () => (
      <Main
        socket={this.socket}
        queue={this.props.history}  
      />
    ),
    DISPLAY: () => (
      <Display 
      queue={this.props.queue}
      history={this.props.history}
      />
    ),
    QRCODE: () => (
      <QrCode />
    )
  }

  componentDidMount() {
  }

  listAllOrders = () => {
    axios.get(this.url, {headers: {"Content-type": "application/json"}})
     .then(res => {
       console.log(res.data);
       const { queue, history } = res.data;
       this.props.updateQueue(queue.concat(history))
     })
  }
  
  componentDidMount = () => {
    this.listAllOrders();
    this.socket = io(window.location.pathname, {
      query: {
        bar: window.location.pathname,
        token: 'token'
      },
    });

    this.socket.on('NEW_ORDER', (newOrder) => {
      this.props.addOrder(newOrder);
    });

    this.socket.on('STATUS_UPDATE', (orderId, status) => {
      if (status !== 'delivered') {
        this.props.updateStatus(status, this.props.queue.find(order => order.orderId === orderId));
      }
    });
  }

  closeSocket = () => {
    this.socket.removeAllListeners();
    this.socket.close();
  }

  componentWillUnmount = () => this.closeSocket();

  render() {
    return (
      <div className="App">
        { this.switch[this.props.page]() }
        <PopUp updatePage={this.props.updatePage}/>
      </div>  
    );
  }
}

const mapStateToProps = (state) => {
  return {
    queue: state.queue,
    history: state.history,
    page: state.page
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQueue: (queue) => dispatch(updateQueue(queue)),
    addOrder: (order) => dispatch(addOrder(order)),
    updateStatus: (status, order) => dispatch(updateStatus(status, order)),
    updatePage: (page) => dispatch(updatePage(page)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
