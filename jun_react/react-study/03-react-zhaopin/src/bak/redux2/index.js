import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {add, counter} from './redux.index.js';

class App extends React.Component {
    render() {
        const store = this.props.store;
        return <div>
            <h1>count: {store.getState()}</h1>
            <button onClick={() => store.dispatch(add())}>加1</button>
        </div>
    }
}

const store = createStore(counter);

function render() {
    ReactDOM.render(
        <App store={store}/>,
        document.getElementById('app')
    );
}

render();
// 一旦store发生变化就重新渲染
store.subscribe(render);
