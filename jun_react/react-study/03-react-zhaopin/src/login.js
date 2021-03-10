import React from 'react';
import {login} from './auth.js'
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

@connect(
    (state) => state,
    {login}
)
class Login extends React.Component {
    render() {
        return <div>
            {this.props.counter}
            {/*如果没有登录，则显示登录按钮，如果已经登录，则跳转到首页*/}
            {!this.props.auth.isAuth ? <button onClick={this.props.login}>登录</button> : <Redirect to='/'/>}
        </div>
    }
}

export default Login;