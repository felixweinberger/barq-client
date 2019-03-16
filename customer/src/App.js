import React, { Component } from 'react';

import Counter from './ui/counter';

import './App.css';

class App extends Component { // eslint-disable-line
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
      <div className="App">
        <Counter count={count} onAdd={() => this.increment(1)} onMinus={() => this.increment(-1)} />
      </div>
    );
  }
}

export default App;
