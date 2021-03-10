import React from 'react';
import Logo from "../../component/logo/logo";
import {Button, InputItem, Radio, WhiteSpace, WingBlank} from "antd-mobile";
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux'
import {Redirect} from "react-router-dom";

@connect(
    state => state.user,
    {register}
)
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'employee',
            username: '',
            password: '',
            confirmPassword: '',
        }
    }

    login() {
        this.props.history.push('/login');
    }

    register() {
        this.props.register(this.state);
    }

    handleChange(key, value) {
        return this.setState({
            [key]: value
        });
    }

    render() {
        let RadioItem = Radio.RadioItem;
        let redirectTo = this.props.redirectTo;
        return (
            <div>
                {redirectTo ? <Redirect to={redirectTo}/> : null}
                <Logo/>
                <WingBlank size="md">
                    <h2>注册</h2>
                    {this.props.error ? <h3>{this.props.error}</h3> : null}
                    <InputItem type="text" placeholder="请输入用户名"
                               onChange={(v) => this.handleChange('username', v)}>
                        手机
                    </InputItem>
                    <WhiteSpace size="sm"/>
                    <InputItem type="password" placeholder="请输入密码"
                               onChange={(v) => this.handleChange('password', v)}>
                        密码
                    </InputItem>
                    <WhiteSpace size="sm"/>
                    <InputItem type="password" placeholder="请确认密码"
                               onChange={(v) => this.handleChange('confirmPassword', v)}>
                        确认密码
                    </InputItem>
                    <WhiteSpace size="sm"/>
                    <RadioItem checked={this.state.type === 'employee'}
                               onChange={v => this.handleChange('type', 'employee')}>
                        牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'boss'}
                               onChange={v => this.handleChange('type', 'boss')}>
                        BOSS
                    </RadioItem>
                    <WhiteSpace size="xl"/>
                    <Button type="primary" onClick={() => this.register()}>注册</Button>
                    <WhiteSpace size="sm"/>
                    <Button type="default" onClick={() => this.login()}>登录</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;