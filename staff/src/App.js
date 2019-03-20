import React, { Component } from 'react';
import './App.css';
import Main from './Containers/main';
import io from 'socket.io-client';
import { updateQueue, addOrder, updateStatus } from './store/actions';
import { connect } from 'react-redux'

class App extends Component {

  
componentDidMount = () => {
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
    this.props.updateStatus(status, orderId);
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
      <Main
        socket={this.socket}
        updateQueue={this.props.updateQueue}
        queue={this.props.queue}  
      />
      </div>  
    );
  }
}

const mapStateToProps = (state) => {
  return {
    queue: state.queue
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQueue: (queue) => dispatch(updateQueue(queue)),
    addOrder: (order) => dispatch(addOrder(order)),
    updateStatus: (status, orderId) => dispatch(updateStatus(status, orderId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
