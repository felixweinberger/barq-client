import React, { Component } from 'react';
import './App.css';
import Main from './Containers/main';
import io from 'socket.io-client';
import { updateQueue, addOrder, updateStatus } from './store/actions';
import { connect } from 'react-redux'

class App extends Component {

  
componentDidMount = () => {
  this.socket = io('/ax9249', {
    query: {
      bar: '/ax9249',
      orderNumber: 'token'
  },
});

this.socket.emit('STATUS_UPDATE', {
  orderId: 'token',
  status: this.props.orderStatus,
  items: this.props.order,
});

this.socket.on('NEW_ORDER', (newOrder) => {
  this.props.updateStatus(newOrder);
})
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
    addOrder: (order) => dispatch(addOrder(order))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
