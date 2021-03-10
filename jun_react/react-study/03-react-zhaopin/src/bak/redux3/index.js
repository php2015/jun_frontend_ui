import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {add, counter} from './redux.index.js';
import App from './app.js'

const store = createStore(counter);

function render() {
    ReactDOM.render(
        <App store={store} add={add}/>,
        document.getElementById('app')
    );
}

render();
// 一旦store发生变化就重新渲染
store.subscribe(render);
