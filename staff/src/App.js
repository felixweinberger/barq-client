import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Main from './Containers/main';
import io from 'socket.io-client';
import { updateQueue, addOrder, updateStatus } from './store/actions';
import { connect } from 'react-redux'

class App extends Component {
  url = `/staff${window.location.pathname}/queue`;

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
    console.log(this.props.queue);
    return (
      <div className="App">
      <Main
        socket={this.socket}
        updateQueue={this.props.updateQueue}
        queue={this.props.history}  
      />
      </div>  
    );
  }
}

const mapStateToProps = (state) => {
  return {
    queue: state.queue,
    history: state.history
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQueue: (queue) => dispatch(updateQueue(queue)),
    addOrder: (order) => dispatch(addOrder(order)),
    updateStatus: (status, order) => dispatch(updateStatus(status, order)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
