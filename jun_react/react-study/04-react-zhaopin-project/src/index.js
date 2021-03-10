import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import './config'
import reducers from './reducers.js';
import Login from './container/login/login.js';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Register from "./container/register/register";
import CommonPage from "./container/common/CommonPage";

const tm = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, tm);


let tokenCookie;
const cookie = document.cookie;//获取cookie字符串
const arrcookie = cookie.split("; ");//分割
console.log('cookies:', arrcookie);
//遍历匹配
for (let i = 0; i < arrcookie.length; i++) {
    let arr = arrcookie[i].split("=");
    if (arr[0] === 'Token') {
        tokenCookie = arr[0];
    }
}
const publicList = ['/login', '/register']
const pathname = window.document.location.pathname
let isPublicPath = publicList.indexOf(pathname) > -1;
console.log(isPublicPath);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    {/*<AuthRoute/>*/}
                    {/*{isPublicPath || tokenCookie ? null : <Redirect to="/login"/>}*/}
                    <Route exact path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route component={CommonPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);


