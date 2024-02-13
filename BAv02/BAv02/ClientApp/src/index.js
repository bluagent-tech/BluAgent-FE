import 'bootstrap/dist/css/bootstrap.css';
import '@coreui/coreui/dist/css/coreui.css';
import '@coreui/icons/css/coreui-icons.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import './index.css';
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ConnectivityListener from './components/ConnectivityListener';
import { ToastProvider } from 'react-toast-notifications';

// Sentry Setup

// Get the application-wide store instance, pre populating with state from the server where available.
const store = configureStore(history);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ToastProvider placement='bottom-right'>
        <ConnectivityListener />
        <App />
      </ToastProvider>
    </ConnectedRouter>
  </Provider>,
  rootElement
);

registerServiceWorker();
