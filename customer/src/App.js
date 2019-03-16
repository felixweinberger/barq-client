import React, { Component } from 'react';

import Counter from './ui/counter';

import './App.css';

class App extends Component { // eslint-disable-line
  render() {
    return (
      <div className="App">
        <Counter onClick={() => console.log('hello')} />
      </div>
    );
  }
}

export default App;
