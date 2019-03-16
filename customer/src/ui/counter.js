import React, { Component } from 'react';

import IconButton from './iconButton';

import '../styles/counter.css';

class Counter extends Component {
  state = {
    count: 0
  }

  increment = (n) => {
    if (this.state.count + n >= 0) {
      this.setState(state => ({
        count: state.count + n
      }))
    }
  }

  render () {
    return (
      <div className='counter'>
        <IconButton iconUrl='/minus.png' onClick={() => this.increment(-1)} />
          <span className='counter__count'>{this.state.count}</span>
        <IconButton iconUrl='/plus.png' onClick={() => this.increment(1)} />
      </div>
    )
  }
};

export default Counter;
