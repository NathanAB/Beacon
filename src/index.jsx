import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import App from './scenes/App/App';
import registerServiceWorker from './registerServiceWorker';
import Store from './store';

import ReactGA from 'react-ga';

ReactGA.initialize('UA-54887334-4', {
  debug: true
});

ReactDOM.render(
  <Store.Container>
    <App />
  </Store.Container>,
  document.getElementById('root'),
);
registerServiceWorker();
