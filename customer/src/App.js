import React, { Component } from 'react';

import PrimaryButton from './ui/primaryButton';

import './App.css';

class App extends Component { // eslint-disable-line
  render() {
    return (
      <PrimaryButton title="Checkout" onClick={() => console.log('hello')} />
    );
  }
}

export default App;
