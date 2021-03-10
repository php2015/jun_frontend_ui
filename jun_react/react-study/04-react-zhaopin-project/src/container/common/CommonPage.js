import React from 'react'
import {NavBar, TabBar} from "antd-mobile";
import EmployeeInfo from "../user/EmployeeInfo";
import {Route} from "react-router-dom";
import {connect} from "react-redux";

@connect(
    state => state.user,
    null
)
export default class CommonPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('xxxxx', this.props);
        const list = [{
            title: '牛人列表',
            path: '/boss/info',
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
            selectedIcon: 'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg',
            hide: this.props.type === 'employee'
        }, {
            title: 'boss',
            path: '/employee/info',
            icon: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',
            selectedIcon: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
            hide: this.props.type === 'boss'
        }, {
            title: '消息',
            path: 'msg',
            icon: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
            selectedIcon: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'
        }];

        return (
            <div>
                <div>
                    <NavBar mode="light">
                        {console.log('xxxxxxxxxxxxxxxx',this.props)}
                        {/*查找出list.path中 ==== 当前路由路径的那条数据*/}
                        {list.find(v=> v.path === this.props.location.pathname).title}
                    </NavBar>
                </div>

                <Route component={EmployeeInfo} path="/employee/info"/>

                <div>
                    <TabBar>
                        {
                            list.filter(v => !v.hide)
                                .map(v => {
                                    return <TabBar.Item
                                        title={v.title}
                                        key={v.title}
                                        icon={<div style={{
                                            width: '22px',
                                            height: '22px',
                                            background: `url(${v.icon}) center center /  21px 21px no-repeat`
                                        }}

                                        />
                                        }>
                                    </TabBar.Item>
                                })
                        }
                    </TabBar>
                </div>
            </div>
        )
    }
}