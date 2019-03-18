import React, { Component } from 'react';

import Menu from './containers/menu';

import './App.css';

class App extends Component { // eslint-disable-line
  render() {
    return (
      <Menu menu={
          {
            categories: [
              {
                _id: 1,
                name: 'fake',
                menuItems: [
                  {
                    _id: 1,
                    name: 'vino',
                    price: '10.5',
                  },
                  {
                    _id: 2,
                    name: 'cerveza',
                    price: '0.2',
                  },
                ],
              },
            ],
          }
        }
      />
    );
  }
}

export default App;
