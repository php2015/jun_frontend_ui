import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducers from './reducers.js';
import Login from './login.js';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import App from "./app";

const tm = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, tm);


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>

            <div>

                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={App}/>
                    <Redirect to='/login'/>
                </Switch>
            </div>
        </BrowserRouter>

    </Provider>,
    document.getElementById('app')
);


