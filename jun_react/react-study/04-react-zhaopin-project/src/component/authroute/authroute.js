import React from 'react';
import {withRouter} from 'react-router-dom';

@withRouter
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            console.log('public list...')
            return null
        }
        else {
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
            if (!tokenCookie) {
                console.log('this.props:', this.props);
                // TODO 这里需要搞清楚为什么不能加这一行。
                // 原先把登录跳转写在authroute.js中的，但是只要有下一行代码就会导致GitHub无法正常登录；
                // 于是将这部分逻辑移到index.js中了。
                // this.props.history.push('/login')
            }
        }
    }

    render() {
        return null;
    }
}

export default AuthRoute;