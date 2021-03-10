import React from 'react';
import {connect} from 'react-redux';
import {login, logout} from './auth.js'
import {Redirect} from "react-router-dom";

@connect(
    // 你要state里的什么属性放到props
    (state) => ({auth: state.auth}),
    // 你要哪些方法放到props里，会自动dispatch
    {login, logout}
)
class App extends React.Component {
    render() {
        return (
            <div>
                {
                    console.log('props', this.props)
                }
                {this.props.auth.isAuth ? <div>
                    <div>欢迎登录</div>
                    <button onClick={this.props.logout}>退出</button>
                </div> : <Redirect to='/login'/>}

            </div>
        );
    }
}

export default App;
