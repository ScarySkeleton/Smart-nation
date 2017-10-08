import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import createStore from './services/router/index.js';

import './index.scss';
import App from './app/App';

import registerServiceWorker from './registerServiceWorker';

const store = createStore();

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();
