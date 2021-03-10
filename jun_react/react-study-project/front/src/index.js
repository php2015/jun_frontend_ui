import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import './config'
import reducers from './reducers';
import Login from './container/login'


const tm = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(reducers, tm);

ReactDOM.render(
    <Provider store={store}>
        <Login/>
    </Provider>,
    document.getElementById('root')
);
