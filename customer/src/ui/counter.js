import React, { Component } from 'react';

import IconButton from './iconButton';

import '../styles/counter.css';

class Counter extends Component {
  state = {
    count: 0,
  }

  increment = (n) => {
    const { count } = this.state;
    if (count + n >= 0) {
      this.setState(state => ({
        count: state.count + n,
      }));
    }
  }

  render() {
    const { count } = this.state;
    return (
      <div className="counter">
        <IconButton iconUrl="/minus.png" onClick={() => this.increment(-1)} />
        <span className="counter__count">{count}</span>
        <IconButton iconUrl="/plus.png" onClick={() => this.increment(1)} />
      </div>
    );
  }
}

export default Counter;
