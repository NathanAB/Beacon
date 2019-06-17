import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import App from './scenes/App/App';
import registerServiceWorker from './registerServiceWorker';
import Store from './store';

ReactDOM.render(
  <Store.Container>
    <App />
  </Store.Container>,
  document.getElementById('root'),
);
registerServiceWorker();
