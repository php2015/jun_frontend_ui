import React from 'react';
import {List, InputItem, Button} from 'antd-mobile';
import {login} from '../redux/user.redux'
import {connect} from "react-redux";

@connect(
    state => state.userReducer,
    {login}
)
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'username': '',
            'password': ''
        }
    }

    dealChange(key, value) {
        this.setState({
            [key]: value
        })
        console.log('state', this.state);
    }

    login() {
        this.props.login(this.state)
    }

    render() {
        return (<div>
            <List>
                <InputItem onChange={(v) => this.dealChange('username', v)}>用户名</InputItem>
                <InputItem onChange={(v) => this.dealChange('password', v)}>密码</InputItem>
                <Button type="primary" onClick={() => this.login()}>登录</Button>
            </List>
        </div>)
    }
}