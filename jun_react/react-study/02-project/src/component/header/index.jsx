import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <header>
            <div className="container">
                <div className="row clearfix">
                    <div className="col-md-12 column">
                        <ul className="nav nav-tabs">
                            <li className="active">
                                <a href="#">首页</a>
                            </li>
                            <li>
                                <a href="#">简介</a>
                            </li>
                            <li className="disabled">
                                <a href="#">信息</a>
                            </li>
                            <li className="dropdown pull-right">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle">下拉<strong
                                    className="caret"></strong></a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="#">操作</a>
                                    </li>
                                    <li>
                                        <a href="#">设置栏目</a>
                                    </li>
                                    <li>
                                        <a href="#">更多设置</a>
                                    </li>
                                    <li className="divider">
                                    </li>
                                    <li>
                                        <a href="#">分割线</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    }
}
export default Header;