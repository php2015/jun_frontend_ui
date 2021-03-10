import React from 'react';
import {NavLink} from 'react-router-dom';
import 'component/sidebar/index.scss';

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <aside>
            <div className="col-md-4 column" style={{'border': '1px solid red'}}>
                <ul className="nav nav-pills nav-stacked">
                    <li>
                        <NavLink exact to="/" activeClassName="active">Home页</NavLink>
                    </li>
                    <li>
                        <NavLink to="/product" activeClassName="active">商品页</NavLink>
                    </li>

                </ul>
            </div>
        </aside>
    }
}

export default Sidebar;