import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import './css/index.css';
import App from './scenes/App/App';
import registerServiceWorker from './registerServiceWorker';
import Store from './store';

ReactGA.initialize('UA-54887334-4', {
  debug: true,
});

ReactDOM.render(
  <Store.Container>
    <App />
  </Store.Container>,
  document.getElementById('root'),
);
registerServiceWorker();
