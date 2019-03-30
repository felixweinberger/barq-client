import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StripeProvider } from 'react-stripe-elements';

import reducers from './store/reducers';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers);

ReactDOM.render(
  <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK}>
    <Provider store={store}>
      <App />
    </Provider>
  </StripeProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
