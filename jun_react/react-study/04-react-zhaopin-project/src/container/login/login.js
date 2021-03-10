import React from 'react';
import Logo from "../../component/logo/logo";
import {Button, InputItem, WhiteSpace, WingBlank} from "antd-mobile";
import {Redirect} from "react-router-dom";
import GitHubLogin from 'react-github-login';
import {connect} from 'react-redux';
import {githubLoginSuccess} from '../../redux/user.redux'

@connect(
    state => state.user, {githubLoginSuccess}
)
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    register() {
        this.props.history.push('/register');
    }

    handleChange(k, v) {
        return this.setState({
            [k]: v
        });
    }

    onFailure(response) {
        console.error('onFailure', response)
    }

    render() {
        console.log('this.props', this.props);
        let redirectTo = this.props.redirectTo;
        return <div>
            {redirectTo ? <Redirect to={redirectTo}/> : null}
            <Logo/>
            <WingBlank size="md">
                <h2>登录</h2>
                <InputItem type="username" placeholder="请输入账号"
                           onChange={v => this.handleChange('username', v)}>
                    账号
                </InputItem>
                <WhiteSpace size="sm"/>
                <InputItem type="password" placeholder="请输入密码"
                           onChange={v => this.handleChange('username', v)}>
                    密码
                </InputItem>
                <WhiteSpace size="xl"/>
                <GitHubLogin clientId="72ada14eb58532e7c955"
                             redirectUri="http://localhost:3000"
                             onSuccess={response => this.props.githubLoginSuccess(response)}
                             onFailure={response => this.onFailure(response)}
                             buttonText="GitHub登录"/>

                <WhiteSpace size="sm"/>
                <Button type="default" onClick={() => this.register()}>注册</Button>
            </WingBlank>
        </div>
    }
}

export default Login;